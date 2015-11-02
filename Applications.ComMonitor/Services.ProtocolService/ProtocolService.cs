using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.Composition;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Services.ProtocolService
{
    [Export(typeof(IProtocolService))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class ProtocolService : IProtocolService
    {
        private Dictionary<ushort, MethodInfo> ParserDict = new Dictionary<ushort, MethodInfo>();

        private CommNet _CommNet= new CommNet();
        public CommNet CommunicationNet { get { return this._CommNet; } }

        private DownTerminalInfo _downTerminalInfo = new DownTerminalInfo();
        public DownTerminalInfo DTerminalInfo { get { return this._downTerminalInfo; } }

        private ushort MsgID;
        private ushort SrcID;
        private ushort DstID;
        private uint DataLen;
        private uint MsgLen;

        private IConfigService _configService;

        private bool IsLittle = BitConverter.IsLittleEndian;


        private const int COLCOUNT = 19;
        private const int LATLONCOUNT = 4;

        public event EventHandler<NodeChangeEventArg> NodeChangeEvent;
        public event EventHandler<LineChangeEventArg> LineChangeEvent;
        [ImportingConstructor]
        public ProtocolService(IConfigService configService)
        {
            _configService = configService;
            //初始化net
            _CommNet.NodeNum = 0;
            _CommNet.CommLines = new ObservableCollection<CommLine>();
            _CommNet.CommNodes = new ObservableCollection<CommNode>();
            //获取该类下面对应的处理方法的反射，用以与ID对应并方便扩展调用，如需新的处理方法可定义一个method并辅以ParserAttribute
            var info  = typeof(ProtocolService);
            foreach(var item in info.GetMethods())
            {
                ParserAttribute ma= null;
                try
                {
                     ma = (ParserAttribute)Attribute.GetCustomAttribute(item, typeof(ParserAttribute));
                
                }
                catch (ArgumentNullException)
                {

                    continue;
                }
                finally
                {
                    if (ma != null)
                    {
                        ParserDict.Add(ma.ParseID, item);
                    }
                    
                }
                
                
            }

        }

        /// <summary>
        /// 处理接收数据，通过反射方法调用对应的方法，
        /// </summary>
        /// <param name="srcBuffer"></param>
        private void ParserDatas(byte[] srcBuffer)
        {
            ushort ID = GetParserID(srcBuffer);
            object[] Params = new object[1];
            Params[0] = srcBuffer;
            if(ParserDict.ContainsKey(ID))
            {
                ParserDict[ID].Invoke(this,Params);
            }
            else
            {
                //接收到错误消息
            }
        }

        private ushort GetParserID(byte[] srcBuffer)
        {
            ushort res = 0;
            if (srcBuffer.Length<2)
            {
                res = 0;
            }
            else
            {
                res = BitConverter.ToUInt16(srcBuffer, 0);
            }
            return res;
        }
        #region Parsers

        [Parser(ParseID = ConstIDs.O_TDMOM_IP_PORT_CNF, Description="接收下位机接收上位机IP确认信息")]
        private void ParseIPPORTCNF(byte[] srcBuffer)
        {
            //通知界面下位机准备好，可以开始发送数据
        }

        [Parser(ParseID = ConstIDs.O_TDMOM_ROUTE_INFO_RSP, Description = "接收路由信息")]
        private void ParseROUTEINFORSP(byte[] srcBuffer)
        {
            DTerminalInfo.RouteInfo.Clear();
            int index = ParseMsgHeader(srcBuffer);
            if ((MsgLen-4 - index)%8 == 0)
	        {
                int numRouteInfo = (int)((MsgLen - index) / 8);
                byte[] tmpbuffer = new byte[8];
                for (int i = 0; i < numRouteInfo; i++)
                {
                    Buffer.BlockCopy(srcBuffer, index, tmpbuffer, 0, 8);
                    index += 8;
                    DTerminalInfo.RouteInfo.Add(new MacAddr(tmpbuffer));
                }
                DTerminalInfo.Dist = (int)srcBuffer[index++];//路由跳数
                DTerminalInfo.Weight = (int)srcBuffer[index++];

	        }
            
            
        }

        [Parser(ParseID = ConstIDs.O_TDMOM_TOP_INFO_RSP, Description = "接收拓扑信息")]
        private void ParseTOPINFORSP(byte[] srcBuffer)
        {
            int index = ParseMsgHeader(srcBuffer);

            //nodeNum
            CommunicationNet.NodeNum =  BitConverter.ToUInt16(srcBuffer, index);
            index += 2;
            if (IsLittle != (_configService.ConfigInfos.CPUType == "Little"))
            {
                CommunicationNet.NodeNum = Endian.SwapUInt16(CommunicationNet.NodeNum);
            }
            //set the update sign to false
            BeginUpdateNode();
            //mac info for nodes
            for (int i = 0; i < CommunicationNet.NodeNum; i++)
            {
                byte[] tmpbuffer = new byte[MacAddr.MACADDRLEN];
                Buffer.BlockCopy(srcBuffer, index, tmpbuffer, 0, MacAddr.MACADDRLEN);
                MacAddr ma = new MacAddr(tmpbuffer);
                CommNode cn = FindMac(ma);
                bool isNull= (cn == null);
                if (isNull)
                {
                    cn = new CommNode { MacAddr = ma, Index = i, IsUpdate = true };
                    CommunicationNet.CommNodes.Add(cn);
                    
                }
                cn.Index = i;


                index+=MacAddr.MACADDRLEN;
                cn.Longitude = BitConverter.ToInt32(srcBuffer, index)/ 1e7;
                index += 4;
                cn.Latitude = BitConverter.ToInt32(srcBuffer, index) / 1e7;
                index += 4;
                cn.Altitude = BitConverter.ToInt32(srcBuffer, index);
                index += 4;
                cn.NodeType = srcBuffer[index++];
                if (isNull)
                {
                    NodeChangeEvent(this, new NodeChangeEventArg { oper = Operations.ADD, Node = cn });
                }
            }
            
            BeginUpdateLine();
            //modify the net
            byte[,] TopInfo = new byte[CommunicationNet.NodeNum, CommunicationNet.NodeNum];
            Buffer.BlockCopy(srcBuffer, index, TopInfo, 0, CommunicationNet.NodeNum * CommunicationNet.NodeNum);
            for (int i = 0; i < CommunicationNet.NodeNum; i++)
            {
                for (int j = 0; j < CommunicationNet.NodeNum; j++)
                {
                    if (i>j)
	                {
                        CommLine cl = FindLine(i, j);
                        bool IsNull= (cl == null);
                        if (IsNull && ((CommStatues)TopInfo[i, j] != CommStatues.NON || (CommStatues)TopInfo[j,i]!= CommStatues.NON))
                        {
                            cl = new CommLine { StartNode = FindNode(i), EndNode = FindNode(j), CommStatuPre = (CommStatues)TopInfo[i, j], CommStatuBac = (CommStatues)TopInfo[j, i] };
                            CommunicationNet.CommLines.Add(cl);
                            LineChangeEvent(this, new LineChangeEventArg  { oper = Operations.ADD, Line = cl });
                        }
                        else
                        {
                            cl.CommStatuPre = (CommStatues)TopInfo[i, j];
                            cl.CommStatuBac = (CommStatues)TopInfo[j, i];

                            if (cl.CommStatuBac == CommStatues.NON && cl.CommStatuPre == CommStatues.NON)
                            {
                                LineChangeEvent(this, new LineChangeEventArg { oper = Operations.DEL, Line = cl });
                                CommunicationNet.CommLines.Remove(cl);
                            }
                        }

                        
	                }
                    
                }
            }
            ENdUpdateLine();
            EndUpdateNode();


        }


        [Parser(ParseID = ConstIDs.O_OMTDM_ALL_USER_IND, Description = "下位机通过本条消息将本节点的用户关联信息上报给终端软件")]
        private void ParseALLUSERIND(byte[] srcBuffer)
        {
            int index = ParseMsgHeader(srcBuffer);
            int userDevNum = (int)DataLen / 10;
            CommunicationNet.UserDevs.Clear();
            for (int i = 0; i < userDevNum; i++)
            {   
                UserDev ud = new UserDev();
                Buffer.BlockCopy(srcBuffer,index,ud.IPAddr,0,4);
                index += 4;
                byte[] tmpBuffer = new byte[MacAddr.MACADDRLEN];
                index += MacAddr.MACADDRLEN;
                ud.MacAddr = new MacAddr(tmpBuffer);
                CommunicationNet.UserDevs.Add(ud);
            }


        }
        private CommNode FindMac(MacAddr ma)
        {
            CommNode res = null;
            foreach (var item in CommunicationNet.CommNodes)
            {
                if (item.MacAddr==ma)
                {
                    item.IsUpdate = true;
                    return item;
                }
            }
            return res;
        }
        private void BeginUpdateNode()
        {
            foreach (var item in CommunicationNet.CommNodes)
            {
                item.IsUpdate = false;
            }
        }
        private void EndUpdateNode()
        {
            for (int i = 0; i < CommunicationNet.CommNodes.Count; i++)
            {
                if (!CommunicationNet.CommNodes[i].IsUpdate)
                {
                    NodeChangeEvent(this, new NodeChangeEventArg { Node = CommunicationNet.CommNodes[i], oper = Operations.DEL });
                    CommunicationNet.CommNodes[i] = null;
                    CommunicationNet.CommNodes.RemoveAt(i);
                    i--;
                }
            }
        }

        private void BeginUpdateLine()
        {
            for (int i = 0; i < CommunicationNet.CommLines.Count;i++ )
            {
                if (CommunicationNet.CommLines[i].StartNode.IsUpdate == false || CommunicationNet.CommLines[i].EndNode.IsUpdate == false)
                {
                    LineChangeEvent(this, new LineChangeEventArg { Line = CommunicationNet.CommLines[i], oper = Operations.DEL });
                    CommunicationNet.CommLines.RemoveAt(i);
                    i--;
                }
            }
        }

        private void ENdUpdateLine()
        {
            //do nothing
        }
        private CommNode FindNode(int index)
        {
            CommNode res = null;
            foreach (var item in CommunicationNet.CommNodes)
            {
                if (item.Index == index)
                {
                    return item;
                }
            }
            return res;
        }
        private CommLine FindLine(int startIndex, int endIndex)
        {
            CommLine res = null;
            foreach (var item in CommunicationNet.CommLines)
            {
                if (string.Format("{0},{1}",startIndex, endIndex) == item.Key)
                {
                    return item;
                }
            }
            return res;
        }
        private int ParseMsgHeader(byte[] srcBuffer)
        {
            //消息ID
            int index = 0;

            MsgID = BitConverter.ToUInt16(srcBuffer, index);
            index+=2;

            //保留
            index += 2;
            //srcid
            SrcID = BitConverter.ToUInt16(srcBuffer, index);
            
            index += 2;
            //dstID
            DstID = BitConverter.ToUInt16(srcBuffer, index);
            
            index += 2;
            //puData
            index += 4;
            //DataLen
            DataLen = BitConverter.ToUInt32(srcBuffer, index);
            index += 4;
            //MsgLen
            MsgLen = BitConverter.ToUInt32(srcBuffer, index);
            index += 4;

            if (IsLittle != (_configService.ConfigInfos.CPUType == "Little"))
            {
                MsgID = Endian.SwapUInt16(MsgID);
                SrcID = Endian.SwapUInt16(SrcID);
                MsgID = Endian.SwapUInt16(MsgID);
                DataLen = Endian.SwapUInt32(DataLen);
                MsgLen = Endian.SwapUInt32(MsgLen);
            }

            return index;

        }
        #endregion
    }
}

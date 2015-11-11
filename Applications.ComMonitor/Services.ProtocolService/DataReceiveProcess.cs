using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    public partial class ProtocolService : IProtocolService
    {
        /// <summary>
        /// 处理接收数据，通过反射方法调用对应的方法，
        /// </summary>
        /// <param name="srcBuffer"></param>
        private void ParserDatas(byte[] srcBuffer)
        {
            ushort ID = GetParserID(srcBuffer);
            object[] Params = new object[1];
            Params[0] = srcBuffer;
            if (ParserDict.ContainsKey(ID))
            {
                ParserDict[ID].Invoke(this, Params);
            }
            else
            {
                //接收到错误消息
            }
        }

        private ushort GetParserID(byte[] srcBuffer)
        {
            ushort res = 0;
            if (srcBuffer.Length < 2)
            {
                res = 0;
            }
            else
            {
                res = BitConverter.ToUInt16(srcBuffer, 0);
            }
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == "Little"))
            {
                res = Endian.SwapUInt16(res);
            }
            return res;
        }

        #region Parsers
        
        [Parser(ParseID = ConstIDs.O_TDMOM_IP_PORT_CNF, Description = "接收下位机接收上位机IP确认信息")]
        private void ParseIPPORTCNF(byte[] srcBuffer)
        {
            //通知界面下位机准备好，可以开始发送数据
            CanQueryRouteAndTopInfo = true;
        }
        
        private const int MAX_NODE_NUM = 10;
        
        [Parser(ParseID = ConstIDs.O_TDMOM_ROUTE_INFO_RSP, Description = "接收路由信息")]
        private void ParseROUTEINFORSP(byte[] srcBuffer)
        {
            DTerminalInfo.RouteInfo.Clear();
            int index = ParseMsgHeader(srcBuffer);
            //num of node
            UInt32 numRouteInfo = BitConverter.ToUInt32(srcBuffer, index);
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == "Little"))
            {
                numRouteInfo = Endian.SwapUInt32(numRouteInfo);
            }
            RouteInfo ri = new RouteInfo();
            for (int i = 0; i < MAX_NODE_NUM; i++)
            {
                byte[] tmpBuffer = new byte[Marshal.SizeOf(ri)];
                Buffer.BlockCopy(srcBuffer, index, tmpBuffer, 0, tmpBuffer.Count());
                ri = (RouteInfo)StructConverter.BytesToStruct(tmpBuffer, tmpBuffer.Count(), typeof(RouteInfo));
                index += Marshal.SizeOf(ri);
            }
            //if ((MsgLen- index)%8 == 0)
            //{
            //    int numRouteInfo = (int)((MsgLen - index) / 8);
            //    byte[] tmpbuffer = new byte[8];
            //    for (int i = 0; i < numRouteInfo; i++)
            //    {
            //        Buffer.BlockCopy(srcBuffer, index, tmpbuffer, 0, 8);
            //        index += 8;
            //        DTerminalInfo.RouteInfo.Add(new MacAddr(tmpbuffer));
            //    }
            //    DTerminalInfo.Dist = (int)srcBuffer[index++];//路由跳数
            //    DTerminalInfo.Weight = (int)srcBuffer[index++];
            //}
        }

        private const double radiusGPS = 0.3;
        private const double deltaDeg = 5;
        private const int indexGPS = 0;
        private void CaculateGPS(out double lat, out double lon)
        {
            lat = _configService.ConfigInfos.CenteredLatitude + radiusGPS*Math.Sin(indexGPS * deltaDeg / 180.0 * Math.PI);
            lon = _configService.ConfigInfos.CenteredLongitude - radiusGPS * Math.Cos(indexGPS * deltaDeg / 180.0 * Math.PI);
        }

        [Parser(ParseID = ConstIDs.O_TDMOM_TOP_INFO_RSP, Description = "接收拓扑信息")]
        private void ParseTOPINFORSP(byte[] srcBuffer)
        {
            int index = ParseMsgHeader(srcBuffer);
            
            //test
            
            //nodeNum
            CommunicationNet.NodeNum = BitConverter.ToUInt16(srcBuffer, index);
            
            index += 2;
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == "Little"))
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
                bool isNull = (cn == null);
                if (isNull)
                {
                    cn = new CommNode { MacAddr = ma, Index = i, IsUpdate = true };
                    CommunicationNet.CommNodes.Add(cn);
                }
                cn.Index = i;
                index += MacAddr.MACADDRLEN;

                if (_configService.ConfigInfos.IsGPSShow)
                {
                    cn.Longitude = BitConverter.ToInt32(srcBuffer, index) / 1e7;
                    index += 4;
                    cn.Latitude = BitConverter.ToInt32(srcBuffer, index) / 1e7;
                    index += 4;
                    cn.Altitude = BitConverter.ToInt32(srcBuffer, index);
                    index += 4;
                }
                else
                {
                    double lat,lon;
                    CaculateGPS(out lat, out lon);
                    index += 12;
                    cn.Longitude = lon;
                    cn.Latitude = lat;
                    cn.Altitude = 0;

                }
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
                    if (i > j)
                    {
                        CommLine cl = FindLine(i, j);
                        bool IsNull = (cl == null);
                        if (IsNull && ((CommStatues)TopInfo[i, j] != CommStatues.NON || (CommStatues)TopInfo[j, i] != CommStatues.NON))
                        {
                            cl = new CommLine { StartNode = FindNode(i), EndNode = FindNode(j), CommStatuPre = (CommStatues)TopInfo[i, j], CommStatuBac = (CommStatues)TopInfo[j, i] };
                            CommunicationNet.CommLines.Add(cl);
                            LineChangeEvent(this, new LineChangeEventArg { oper = Operations.ADD, Line = cl });
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
            EndUpdateLine();
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
                Buffer.BlockCopy(srcBuffer, index, ud.IPAddr, 0, 4);
                index += 4;
                byte[] tmpBuffer = new byte[6];
                index += 6;
                ud.MacAddr = new MacAddr(tmpBuffer);
                CommunicationNet.UserDevs.Add(ud);
            }
        }
        
        private CommNode FindMac(MacAddr ma)
        {
            CommNode res = null;
            foreach (var item in CommunicationNet.CommNodes)
            {
                if (item.MacAddr == ma)
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
            for (int i = 0; i < CommunicationNet.CommLines.Count; i++)
            {
                if (CommunicationNet.CommLines[i].StartNode.IsUpdate == false || CommunicationNet.CommLines[i].EndNode.IsUpdate == false)
                {
                    LineChangeEvent(this, new LineChangeEventArg { Line = CommunicationNet.CommLines[i], oper = Operations.DEL });
                    CommunicationNet.CommLines.RemoveAt(i);
                    i--;
                }
            }
        }
        
        private void EndUpdateLine()
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
                if (string.Format("{0},{1}", startIndex, endIndex) == item.Key)
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
            index += 2;
            
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
            
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == "Little"))
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
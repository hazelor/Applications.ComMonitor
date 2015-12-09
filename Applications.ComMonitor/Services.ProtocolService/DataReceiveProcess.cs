﻿using Commons.Infrastructure;
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
using System.Xml.Linq;

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
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                res = Endian.SwapUInt16(res);
            }
            return res;
        }

        #region Parsers
        public event EventHandler<EventMsgArgs> RecieveMsgEvent;
        public event EventHandler IPSettingSuccessMsgReceiveEvent;

        
        [Parser(ParseID = ConstIDs.O_TDMOM_IP_PORT_CNF, Description = "接收下位机接收上位机IP确认信息")]
        private void ParseIPPORTCNF(byte[] srcBuffer)
        {
            //通知界面下位机准备好，可以开始发送数据
            CanQueryRouteAndTopInfo = true;
            IPSettingSuccessMsgReceiveEvent(this, new EventArgs());
        }

        
        private const int MAX_NODE_NUM = 10;
        
        [Parser(ParseID = ConstIDs.O_TDMOM_ROUTE_INFO_RSP, Description = "接收路由信息")]
        private void ParseROUTEINFORSP(byte[] srcBuffer)
        {
            //DTerminalInfo.RouteInfo.Clear();
            int index = ParseMsgHeader(srcBuffer);
            //num of node
            UInt32 numRouteInfo = BitConverter.ToUInt32(srcBuffer, index);
            index += 4;
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                numRouteInfo = Endian.SwapUInt32(numRouteInfo);
            }
            DTerminalInfo.numRouteInfo = (int)numRouteInfo;
            RouteInfo ri = new RouteInfo();
            if (DTerminalInfo.RouteInfo.Count == 0)
            {
                for (int i = 0; i < MAX_NODE_NUM; i++)
                {
                    byte[] tmpBuffer = new byte[Marshal.SizeOf(ri)];
                    Buffer.BlockCopy(srcBuffer, index, tmpBuffer, 0, tmpBuffer.Count());
                    ri = (RouteInfo)StructConverter.BytesToStruct(tmpBuffer, tmpBuffer.Count(), typeof(RouteInfo));
                    index += Marshal.SizeOf(ri);
                    DTerminalInfo.RouteInfo.Add(ri);
                }
            }
            else
            {
                for (int i = 0; i < MAX_NODE_NUM; i++)
                {
                    byte[] tmpBuffer = new byte[Marshal.SizeOf(ri)];
                    Buffer.BlockCopy(srcBuffer, index, tmpBuffer, 0, tmpBuffer.Count());
                    ri = (RouteInfo)StructConverter.BytesToStruct(tmpBuffer, tmpBuffer.Count(), typeof(RouteInfo));
                    index += Marshal.SizeOf(ri);
                    DTerminalInfo.RouteInfo[i] = (ri);
                }
            }
            
            DTerminalInfo.OnUpdate();
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

        //用mac作为Key记录下来
        
        private const double radiusGPS = 0.1;
        private const double deltaDeg = 5;
        private const int indexGPS = 0;
        private void CaculateGPS(out double lat, out double lon, int index, MacAddr mac)
        {
            CommNode cn = GetMacRecord(mac);
            if (cn == null)
            {
                lat = _configService.ConfigInfos.CenteredLatitude + radiusGPS * Math.Sin(index * deltaDeg / 180.0 * Math.PI);
                lon = _configService.ConfigInfos.CenteredLongitude - radiusGPS * Math.Cos(index * deltaDeg / 180.0 * Math.PI);
            }
            else
            {
                lat = cn.Latitude;
                lon = cn.Longitude;
            }

            //lat = _configService.ConfigInfos.CenteredLatitude;
            //lon = _configService.ConfigInfos.CenteredLongitude;
        
        }

        private CommNode GetMacRecord(MacAddr mac)
        {
            foreach (var item in _recordNodeGPS)
            {
                if (item.MacAddr.Equals(mac))
                {
                    return item;
                }
            }

            return null;
        }
        

        [Parser(ParseID = ConstIDs.O_TDMOM_TOP_INFO_RSP, Description = "接收拓扑信息")]
        private void ParseTOPINFORSP(byte[] srcBuffer)
        {
            int index = ParseMsgHeader(srcBuffer);
            
            //test
            
            //nodeNum
            CommunicationNet.NodeNum = BitConverter.ToUInt16(srcBuffer, index);
            
            index += 2;
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                CommunicationNet.NodeNum = Endian.SwapUInt16(CommunicationNet.NodeNum);
            }
            //判断 数据长度 是否满足格式要求
            if (DataLen != CommunicationNet.NodeNum*COLCOUNT+2+CommunicationNet.NodeNum*CommunicationNet.NodeNum*Marshal.SizeOf(typeof(LINE_INFO)))
            {
                //数据长度不一致，数据帧错误
                return;
            }

            //set the update sign to false
            BeginUpdateNode();
            //mac info for nodes
            for (int i = 0; i < CommunicationNet.NodeNum; i++)
            {
                byte[] tmpbuffer = new byte[MacAddr.MACADDRLEN_SHORT];
                Buffer.BlockCopy(srcBuffer, index, tmpbuffer, 0, MacAddr.MACADDRLEN_SHORT);
                MacAddr ma = new MacAddr(tmpbuffer);
                CommNode cn = FindMac(ma);
                bool isNull = (cn == null);
                if (isNull)
                {
                    cn = new CommNode { MacAddr = ma, Index = i, IsUpdate = true, LineInfoOfNode = new System.Collections.ObjectModel.ObservableCollection<CommLine>() };

                    CommunicationNet.CommNodes.Add(cn);

                }
                cn.Index = i;
                index += MacAddr.MACADDRLEN_SHORT;

                if (_configService.ConfigInfos.IsGPSShow)
                {
                    cn.Longitude = BitConverter.ToInt32(srcBuffer, index) / 1e7;
                    index += 4;
                    cn.Latitude = BitConverter.ToInt32(srcBuffer, index) / 1e7;
                    index += 4;
                    cn.Altitude = BitConverter.ToInt32(srcBuffer, index);
                    index += 4;
                }
                else if(isNull)
                {
                    double lat,lon;
                    CaculateGPS(out lat, out lon, cn.Index, cn.MacAddr);
                    index += 12;
                    cn.Longitude = lon;
                    cn.Latitude = lat;
                    cn.Altitude = 0;

                }
                else
                {
                    index += 12;
                }
                //节点类型
                cn.NodeType = srcBuffer[index++];
                if (_NodeImageDict.ContainsKey(cn.NodeType))
                {
                    cn.ImagePath = _NodeImageDict[cn.NodeType];
                }
               

                //节点名称
                tmpbuffer = new byte[4];
                Buffer.BlockCopy(srcBuffer,index,tmpbuffer,0,4);
                cn.NodeName = System.Text.Encoding.UTF8.GetString(tmpbuffer).TrimEnd('\0');
                index += 4;
                if (isNull)
                {
                    NodeChangeEvent(this, new NodeChangeEventArg { oper = Operations.ADD, Node = cn });
                }
            }
            
            BeginUpdateLine();
            //modify the net
            LINE_INFO[,] TopInfo = new LINE_INFO[CommunicationNet.NodeNum, CommunicationNet.NodeNum];

            //Buffer.BlockCopy(srcBuffer, index, TopInfo, 0, CommunicationNet.NodeNum * CommunicationNet.NodeNum * Marshal.SizeOf(typeof(LINE_INFO)));
            byte[] tmpBuffer = new byte[Marshal.SizeOf(typeof(LINE_INFO))];
            int srcBufferOffset= 0;
            for (int i = 0; i < CommunicationNet.NodeNum; i++)
            {
                for (int j = i; j < CommunicationNet.NodeNum; j++)
                {
                    if (i < j)
                    {
                        srcBufferOffset = i*Marshal.SizeOf(typeof(LINE_INFO))*CommunicationNet.NodeNum+j*Marshal.SizeOf(typeof(LINE_INFO));
                        Buffer.BlockCopy(srcBuffer, index+srcBufferOffset, tmpBuffer, 0, tmpBuffer.Length);
                        TopInfo[i, j] = (LINE_INFO)StructConverter.BytesToStruct(tmpBuffer, typeof(LINE_INFO));
                        srcBufferOffset = j * Marshal.SizeOf(typeof(LINE_INFO)) * CommunicationNet.NodeNum + i * Marshal.SizeOf(typeof(LINE_INFO));
                        Buffer.BlockCopy(srcBuffer, index+srcBufferOffset, tmpBuffer, 0, tmpBuffer.Length);
                        TopInfo[j, i] = (LINE_INFO)StructConverter.BytesToStruct(tmpBuffer, typeof(LINE_INFO));

                        CommLine cl = FindLine(i, j);
                        bool IsNull = (cl == null);
                        if (IsNull )
                        {
                            
                            cl = new CommLine { StartNode = FindNode(i),
                                                EndNode = FindNode(j),
                                                LineInfoPre = TopInfo[i, j],
                                                LineInfoBac= TopInfo[j,i],
                                                CommStatuPre = GetCommStatus(TopInfo[i, j].InfoQuality),
                                                CommStatuBac = GetCommStatus(TopInfo[j, i].InfoQuality) };
                            if (!HasLine(cl.StartNode, cl))
                            {
                                cl.StartNode.LineInfoOfNode.Add(cl);
                            }

                            if (!HasLine(cl.EndNode, cl))
                            {
                                cl.EndNode.LineInfoOfNode.Add(cl);
                            }
                            

                            CommunicationNet.CommLines.Add(cl);
                            LineChangeEvent(this, new LineChangeEventArg { oper = Operations.ADD, Line = cl });
                        }
                        else
                        {

                            cl.LineInfoPre = TopInfo[i, j];
                            cl.LineInfoBac = TopInfo[j, i];
                            cl.CommStatuPre = GetCommStatus(TopInfo[i, j].InfoQuality);
                            cl.CommStatuBac = GetCommStatus(TopInfo[j, i].InfoQuality);
                            
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
            //set sendtopcount
            _TopSendCount = 0;
            isClear = true;
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



        [Parser(ParseID = ConstIDs.STRU_OMTDM_FREQ_RSP, Description = "接收频点查询消息")]
        private void ParseFREQRSP(byte[] srcBuffer)
        {
            int index = ParseMsgHeader(srcBuffer);
            int userDevNum = (int)MsgLen;
            if (userDevNum == 24)
            {
                byte[] tmpBuffer = new byte[4];
                Buffer.BlockCopy(srcBuffer,index,tmpBuffer,0,4);
                //处理四个频点值
                RecieveMsgEvent(this, new EventMsgArgs { MsgID = ConstIDs.STRU_OMTDM_FREQ_RSP, Content = tmpBuffer });
            }
        }

        [Parser(ParseID = ConstIDs.O_TDMOM_PARA_CFG, Description = "接参数设置成功消息")]
        private void ParsePARAREQ(byte[] srcBuffer)
        {
            //接收参数成功
            RecieveMsgEvent(this, new EventMsgArgs { MsgID = ConstIDs.O_TDMOM_PARA_REQ });

        }

        private CommNode FindMac(MacAddr ma)
        {
            CommNode res = null;
            foreach (var item in CommunicationNet.CommNodes)
            {
                if (item.MacAddr.Equals(ma))
                {
                    item.IsUpdate = true;
                    return item;
                }
            }
            return res;
        }
        
        private bool HasLine(CommNode n, CommLine l)
        {
            if (n.LineInfoOfNode!= null && n.LineInfoOfNode.Count>0)
            {
                foreach (var item in n.LineInfoOfNode)
                {
                    if (item.Key == l.Key)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        private void BeginUpdateNode()
        {
            foreach (var item in CommunicationNet.CommNodes)
            {
                item.IsUpdate = false;
            }
        }

        private List<CommNode> _recordNodeGPS = new List<CommNode>();
        private void EndUpdateNode()
        {
            for (int i = 0; i < CommunicationNet.CommNodes.Count; i++)
            {
                if (!CommunicationNet.CommNodes[i].IsUpdate)
                {
                    if (!_configService.ConfigInfos.IsGPSShow)
                    {
                        RecordNodeGPS(CommunicationNet.CommNodes[i]);
                    }
                    
                    NodeChangeEvent(this, new NodeChangeEventArg { Node = CommunicationNet.CommNodes[i], oper = Operations.DEL });
                    CommunicationNet.CommNodes[i].LineInfoOfNode.Clear();
                    CommunicationNet.CommNodes[i] = null;
                    CommunicationNet.CommNodes.RemoveAt(i);
                    i--;
                }
            }
        }
        
        private void RecordNodeGPS(CommNode n)
        {
            foreach (var item in _recordNodeGPS)
            {

                if (item.MacAddr.Equals(n.MacAddr))
                {
                    item.Longitude = n.Longitude;
                    item.Latitude = n.Latitude;
                    item.Altitude = n.Altitude;
                }
            }

            _recordNodeGPS.Add(new CommNode { MacAddr = new MacAddr(n.MacAddr.Src), Latitude = n.Latitude, Longitude = n.Longitude, Altitude = n.Altitude });
        }

        private void BeginUpdateLine()
        {
            for (int i = 0; i < CommunicationNet.CommLines.Count; i++)
            {
                if (CommunicationNet.CommLines[i].StartNode.IsUpdate == false || CommunicationNet.CommLines[i].EndNode.IsUpdate == false)
                {
                    CommunicationNet.CommLines[i].StartNode.LineInfoOfNode.Remove(CommunicationNet.CommLines[i]);
                    CommunicationNet.CommLines[i].EndNode.LineInfoOfNode.Remove(CommunicationNet.CommLines[i]);

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
        
        private CommStatues GetCommStatus(sbyte InfoQuality)
        {
            //if (InfoQuality<=_configService.ConfigInfos.BadUpper)
            //{
            //    return CommStatues.BAD;
            //}
            //else 
            if (InfoQuality>=_configService.ConfigInfos.GoodUpper)
            {
                return CommStatues.EXCELLENT;
            }
            else if (InfoQuality>=_configService.ConfigInfos.MedianUpper)
            {
                return CommStatues.GOOD;
            }
            else
            {
                return CommStatues.NORMAL;
            }
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

            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
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
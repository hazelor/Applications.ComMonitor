using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using Services.ConfigService;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    //[Export(typeof(DataProcessService))]
    //[PartCreationPolicy(CreationPolicy.Shared)]
    public partial class ProtocolService : IProtocolService
    {
        //private IConfigService _configService;

        //[ImportingConstructor]
        //public DataProcessService(IConfigService ConfigService)
        //{
        //    _configService = ConfigService;
        //}

        /// <summary>
        /// 发送IP信息
        /// </summary>
        public byte[] SendIpInfo()
        {
            MsgHeader mh = new MsgHeader();
            IpPortCFC ips = new IpPortCFC();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_IP_PORT_CFG;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh) + (uint)Marshal.SizeOf(ips);
            CheckCPUTypeMsgHeader(ref mh);

            byte[] res_mh = StructConverter.StructToBytes(mh);


            ips.IpAddr = new byte[16];
            byte[] strbytes = System.Text.Encoding.ASCII.GetBytes(_configService.ConfigInfos.TermialIP);
            Buffer.BlockCopy(strbytes, 0, ips.IpAddr, 0, ips.IpAddr.Length > strbytes.Length ? strbytes.Length : ips.IpAddr.Length);
            ips.PortNum = (uint)_configService.ConfigInfos.TerminalPort;
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                ips.PortNum = Endian.SwapUInt32(ips.PortNum);
            }

            byte[] res_IpPort = StructConverter.StructToBytes(ips);

            //合并两个byte[]
            byte[] sendBytes = new byte[res_mh.Length + res_IpPort.Length];
            System.Buffer.BlockCopy(res_mh, 0, sendBytes, 0, res_mh.Length);
            System.Buffer.BlockCopy(res_IpPort, 0, sendBytes, res_mh.Length, res_IpPort.Length);
            //if (BitConverter.IsLittleEndian)
            //    Array.Reverse(sendBytes);
            //if (IPSettingSuccessMsgReceiveEvent != null)
            //{
            //    IPSettingSuccessMsgReceiveEvent(this, new EventArgs());
            //}
            return sendBytes;
            //发送

        }

        /// <summary>
        /// 查询路由信息
        /// </summary>
        public byte[] QueryRouteInfo()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_ROUTE_INFO_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            CheckCPUTypeMsgHeader(ref mh);

            //if (IsLittle != (_configService.ConfigInfos.CPUType == "Little"))
            //{
            //    mh.SrcID = Endian.SwapUInt16(mh.SrcID);
            //    mh.DstID = Endian.SwapUInt16(mh.DstID);
            //    mh.DataLen = Endian.SwapUInt32(mh.DataLen);
            //    mh.MsgLen = Endian.SwapUInt32(mh.MsgLen);
            //}

            byte[] res_mh = StructConverter.StructToBytes(mh);
            return res_mh;
            //发送

        }

        /// <summary>
        /// 查询拓扑信息
        /// </summary>
        public byte[] QueryTopInfo()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_TOP_INFO_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            CheckCPUTypeMsgHeader(ref mh);
            //if (IsLittle != (_configService.ConfigInfos.CPUType == "Little"))
            //{
            //    mh.SrcID = Endian.SwapUInt16(mh.SrcID);
            //    mh.DstID = Endian.SwapUInt16(mh.DstID);
            //    mh.DataLen = Endian.SwapUInt32(mh.DataLen);
            //    mh.MsgLen = Endian.SwapUInt32(mh.MsgLen);
            //}
            byte[] res_mh = StructConverter.StructToBytes(mh);
            
            return res_mh;
        }


        /// <summary>
        /// 消息过滤
        /// </summary>
        /// <param name="msgs">过滤的消息ID list</param>
        public void FilterMsg(ushort[] msgs)
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_FILTER_CFG;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = (uint)msgs.Length*sizeof(ushort);
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            byte[] sendBuffer = new byte[mh.DataLen + mh.MsgLen];
            CheckCPUTypeMsgHeader(ref mh);
            int index = 0;
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, Marshal.SizeOf(typeof(MsgHeader)));
            index += Marshal.SizeOf(typeof(MsgHeader));
            for (int i = 0; i < msgs.Length; i++)
            {
                if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
                {
                    Buffer.BlockCopy(BitConverter.GetBytes(Endian.SwapUInt16(msgs[i])),0,sendBuffer,index,2);
                    index += 2;
                }
                else
                {
                    Buffer.BlockCopy(BitConverter.GetBytes(msgs[i]), 0, sendBuffer, index, 2);
                    index += 2;
                }
            }
            AddSendData(sendBuffer);
            //SendData(sendBuffer);

        }


        /// <summary>
        /// 参数设置
        /// </summary>
        /// <param name="datas">设置参数的数据内容</param>
        public void ParamSetting(byte[] datas)
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_PARA_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = (uint)datas.Length;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            byte[] sendBuffer = new byte[mh.DataLen + mh.MsgLen];
            CheckCPUTypeMsgHeader(ref mh);
            int index = 0;
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, Marshal.SizeOf(typeof(MsgHeader)));
            index += Marshal.SizeOf(typeof(MsgHeader));
            Buffer.BlockCopy(datas, 0, sendBuffer, index, datas.Length);

            AddSendData(sendBuffer);

        }
        
        /// <summary>
        /// 频点查询
        /// </summary>
        public void FreQuery()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.STRU_TDMOM_FREQ_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            byte[] sendBuffer = new byte[mh.DataLen + mh.MsgLen];
            CheckCPUTypeMsgHeader(ref mh);
            int index = 0;
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, Marshal.SizeOf(typeof(MsgHeader)));
            index += Marshal.SizeOf(typeof(MsgHeader));

            AddSendData(sendBuffer);
        }

        /// <summary>
        /// wifi 控制
        /// </summary>
        /// <param name="datas"></param>
        public void WIFICtrl(byte[] datas)
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_PARA_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh)+4;
            byte[] sendBuffer = new byte[mh.DataLen + mh.MsgLen];
            CheckCPUTypeMsgHeader(ref mh);
            int index = 0;
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, Marshal.SizeOf(typeof(MsgHeader)));
            index += Marshal.SizeOf(typeof(MsgHeader));
            Buffer.BlockCopy(datas, 0, sendBuffer, index, datas.Length);

            AddSendData(sendBuffer);
        }

        public void ReadParaCtrl()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.STRU_TDMOM_READPARA_REQ;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);
            byte[] sendBuffer = new byte[mh.DataLen + mh.MsgLen];
            int index = 0;
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, Marshal.SizeOf(typeof(MsgHeader)));
            AddSendData(sendBuffer);
        }

        private void CheckCPUTypeMsgHeader(ref MsgHeader mh)
        {
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                mh.MsgID = Endian.SwapUInt16(mh.MsgID);
                mh.SrcID = Endian.SwapUInt16(mh.SrcID);
                mh.DstID = Endian.SwapUInt16(mh.DstID);
                mh.DataLen = Endian.SwapUInt32(mh.DataLen);
                mh.MsgLen = Endian.SwapUInt32(mh.MsgLen);
            }
        }
    }
}

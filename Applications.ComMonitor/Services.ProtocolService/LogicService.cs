using Commons.Infrastructure.Interface;
using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    [Export(typeof(ILogicService))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class LogicService : ILogicService
    {
        IProtocolService _protocolService;
        IConfigService _configService;
        PreciseTimer _queryTimmer = new PreciseTimer();
        [ImportingConstructor]
        public LogicService(IProtocolService protocolService, IConfigService configService)
        {
            _protocolService = protocolService;
            _configService = configService;
            _queryTimmer.Interval = _configService.ConfigInfos.UpdateRate;

        }

        #region Public Methods
        public void StartChannel()
        {
            _queryTimmer.Start();
        }

        public void StopChannel()
        {
            _queryTimmer.Stop();
        }

        /// <summary>
        /// 
        /// </summary>
        public void SendIpInfo()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_IP_PORT_CFG;

            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);

            byte[] res_mh = StructConverter.StructToBytes(mh);

            IpPortCFCStruct ips = new IpPortCFCStruct();
            byte[] strbytes= System.Text.Encoding.Unicode.GetBytes(_configService.ConfigInfos.TermialIP);
            Buffer.BlockCopy(strbytes, 0, ips.IpAddr, 0, ips.IpAddr.Length > strbytes.Length ? strbytes.Length : ips.IpAddr.Length);
            ips.PortNum = (uint)_configService.ConfigInfos.TerminalPort;

            //发送

        }

        /// <summary>
        /// 
        /// </summary>
        public void QueryRouteInfo()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_ROUTE_INFO_REQ;
            
            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);

            byte[] res_mh = StructConverter.StructToBytes(mh);
            //发送

        }

        /// <summary>
        /// 
        /// </summary>
        public void QueryTopInfo()
        {
            MsgHeader mh = new MsgHeader();
            //参数赋值
            mh.MsgID = ConstIDs.O_TDMOM_TOP_INFO_REQ;

            mh.puData = 0;
            mh.DataLen = 0;
            mh.MsgLen = (uint)Marshal.SizeOf(mh);

            byte[] res_mh = StructConverter.StructToBytes(mh);
        }

        #endregion

        private void OnQueryTimmer(object sender,EventArgs e)
        {
            _queryTimmer.Stop();
            //send some package for querying
            QueryRouteInfo();
            QueryRouteInfo();
            _queryTimmer.Start();
        }

        #region Message Header Struct


        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct MsgHeader
        {
            public ushort MsgID;
            public ushort serv;
            public ushort SrcID;
            public ushort DstID;
            public UInt32 puData;
            public UInt32 DataLen;
            public UInt32 MsgLen;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct IpPortCFCStruct
        {
            public byte[] IpAddr = new byte[16];
            public UInt32 PortNum;
        }


        #endregion


    }
}

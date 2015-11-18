using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct STRU_TDMOM_FREQ_REQ
    {
        [Description("消息头")]
        public MsgHeader struMsgHeader;
    }

    //查询频点返回结果
    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct STRU_OMTDM_FREQ_RSP
    {
        [Description("消息头")]
        public MsgHeader struMsgHeader;

        [Description("工作频点")]
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
        public byte[] u8FreqDot;	
    }
}
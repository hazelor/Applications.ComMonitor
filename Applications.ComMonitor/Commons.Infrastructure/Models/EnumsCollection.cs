using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    /// <summary>
    /// 节点意愿度 U8NodeWillingness
    /// </summary>
    public enum EnumNodeWillingness
    {
        WILL_NEVER = 0,
        WILL_DEFAULT = 3,
        WILL_ALWAYS = 7
    }

    /// <summary>
    /// Freq
    /// </summary>
    public enum EnumFreq
    {
        [Description("不存在")]
        _0MHz = 0,
        [Description("700MHz")]
        _780MHz = 1,
        [Description("2.4GHz")]
        _2400MHz = 2,
        [Description("5.8GHz")]
        _5800MHz = 3
    }

    /// <summary>
    /// 国家码  
    /// </summary>
    public enum EnumCountryCode
    {
        cn = 0,
        us = 1,
        uk = 2,
        fr = 3,
        de = 4,
        jpn = 5
    }

    /// <summary>
    /// 信道  
    /// </summary>
    public enum EnumChannel
    {
        [Description("自动")]
        Auto = 0,
        [Description("Channel 01: 2.412GHz")]
        信道1 = 1,
        [Description("Channel 02: 2.417GHz")]
        信道2 = 2,
        [Description("Channel 03: 2.422GHz")]
        信道3 = 3,
        [Description("Channel 04: 2.4272GHz")]
        信道4 = 4,
        [Description("Channel 05: 2.432GHz")]
        信道5 = 5,
        [Description("Channel 06: 2.437GHz")]
        信道6 = 6,
        [Description("Channel 07: 2.442GHz")]
        信道7 = 7,
        [Description("Channel 08: 2.447GHz")]
        信道8 = 8,
        [Description("Channel 09: 2.452GHz")]
        信道9 = 9,
        [Description("Channel 10: 2.457GHz")]
        信道10 = 10,
        [Description("Channel 11: 2.462GHz")]
        信道11 = 11,
        [Description("Channel 12: 2.467GHz")]
        信道12 = 12,
        [Description("Channel 13: 2.472GHz")]
        信道13 = 13,
        [Description("Channel 14: 2.484GHz")]
        信道14 = 14,

        [Description("Channel 36: 5.18GHz")]
        信道36 = 36,
        [Description("Channel 40: 5.2GHz")]
        信道40 = 40,
        [Description("Channel 44: 5.22GHz")]
        信道44 = 44,
        [Description("Channel 48: 5.24GHz")]
        信道48 = 48,
        [Description("Channel 52: 5.26GHz")]
        信道52 = 52,
        [Description("Channel 56: 5.28GHz")]
        信道56 = 56,
        [Description("Channel 60: 5.3GHz")]
        信道60 = 60,
        [Description("Channel 64: 5.32GHz")]
        信道64 = 64,

        [Description("Channel 100: 5.5GHz")]
        信道100 = 100,
        [Description("Channel 104: 5.52GHz")]
        信道104 = 104,
        [Description("Channel 108: 5.54GHz")]
        信道108 = 108,
        [Description("Channel 112: 5.56GHz")]
        信道112 = 112,
        [Description("Channel 116: 5.58GHz")]
        信道116 = 116,

        [Description("Channel 132: 5.66GHz")]
        信道132 = 132,
        [Description("Channel 136: 5.68GHz")]
        信道136 = 136,
        [Description("Channel 140: 5.7GHz")]
        信道140 = 140,
        [Description("Channel 149: 5.745GHz")]
        信道149 = 149,
        [Description("Channel 153: 5.765GHz")]
        信道153 = 153,
        [Description("Channel 157: 5.785GHz")]
        信道157 = 157,
        [Description("Channel 161: 5.805GHz")]
        信道161 = 161,
        [Description("Channel 165: 5.825GHz")]
        信道165 = 165
    }

    /// <summary>
    /// 信道带宽
    /// </summary>
    public enum EnumChanWid
    {
        [Description("5MHz")]
        _5MHz = 0,
        [Description("10MHz")]
        _10MHz = 1,
        [Description("20MHz")]
        _20MHz = 2,
        [Description("40MHz")]
        _40MHz = 3
    }

    /// <summary>
    /// 最大发身功率
    /// </summary>
    public enum EnumTxPower
    {
        [Description("29dBm")]
        _29dBm = 0,
        [Description("30dBm")]
        _30dBm = 1,
    }

    /// <summary>
    /// 操作模式
    /// </summary>
    public enum EnumOperMode
    {
        adhoc = 0,
        ap = 1,
        sta = 2
    }

    /// <summary>
    /// 隐藏模式
    /// </summary>
    public enum EnumHide
    {
        广播SSID = 0,
        隐藏 = 1
    }

    /// <summary>
    /// 加密方式
    /// </summary>
    public enum EnumEncryptMode
    {
        none = 0,
        wep = 1,
        psk = 2,
        psk2 = 3,
        wpa = 4,
        wpa2 = 5
    }

    /// <summary>
    /// 网络接口
    /// </summary>
    public enum EnumNetwork
    {
        wan = 0,
        lan = 1
    }

    /// <summary>
    /// 常用命令
    /// </summary>
    public enum EnumCmd
    {
        [Description("CMD_AGT_ALL_USER")]
        O_DEBUG_CMD_AGT_ALL_USER = 1,
        [Description("AGT_LOCAL_USER")]
        O_DEBUG_CMD_AGT_LOCAL_USER = 2,
        [Description("AGT_IFACE")]
        O_DEBUG_CMD_AGT_IFACE = 3,
        [Description("AGT_ROUTE")]
        O_DEBUG_CMD_AGT_ROUTE = 4,
        [Description("RTE_ROUTE_TABLE")]
        O_DEBUG_RTE_ROUTE_TABLE = 100,
        [Description("RTE_LOCAL_TOP")]
        O_DEBUG_RTE_LOCAL_TOP = 101,
        [Description("RTE_NET_TOP")]
        O_DEBUG_RTE_NET_TOP = 102,
        [Description("RTE_MPR_TABLE")]
        O_DEBUG_RTE_MPR_TABLE = 103,
        [Description("RTE_MS_TABLE")]
        O_DEBUG_RTE_MS_TABLE = 104,
        [Description("RTE_1_HOP_NEIGHBOR_TABLE")]
        O_DEBUG_RTE_1_HOP_NEIGHBOR_TABLE = 105,
        [Description("RTE_2_HOP_NEIGHBOR_TABLE")]
        O_DEBUG_RTE_2_HOP_NEIGHBOR_TABLE = 106,
        [Description("RTE_LINK_TABLE")]
        O_DEBUG_RTE_LINK_TABLE = 107,
        [Description("RTE_INTERFACE_TABLE	")]
        O_DEBUG_RTE_INTERFACE_TABLE = 108,
        [Description("RTE_NODE_INFORMATION")]
        O_DEBUG_RTE_NODE_INFORMATION = 109
    }

    public enum EnumNodeType
    {
        [Description("驾校（车载）")]
        DriverSchool_Car = 1,
        [Description("驾校（基站）")]
        DriverSchool_Base = 2,
        [Description("单兵")]
        Singler = 3,
        [Description("车载")]
        Car = 4,
        [Description("舰载")]
        Boat = 5,
        [Description("卫星")]
        Satellite = 6,
    }
}
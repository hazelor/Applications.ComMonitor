using Commons.Infrastructure.Attributes;
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
    public struct STRU_TDMOM_PARA_CFG
    {
        [Description("消息头")]
        public MsgHeader struMsgHeader;
        [Description("OLSR配置")]
        public STRU_OLSR_PARAME struOlsrParame;

        [Description("Wifi配置结构体")]
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
        public STRU_WIFI_PARAME[] astruWiFiParame;
    }

    // STRU_OLSR_PARAME
    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct STRU_OLSR_PARAME
    {
        [Description("Hello发送间隔")]
        [DescriptionField(Size = 2, FieldType = FieldTypeEnum.Ushort, Description = "Hello发送间隔")]
        public ushort u16HelloInterval;

        [Description("NEIGHB_HOLD_TIME与HELLO_INTVRVAL之间的倍数，默认值为3")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "NEIGHB拓扑倍数")]
        public byte u8NeighbroHoldMultiple;

        [Description("保留位")]
        public byte u8Rsv1;

        [Description("TC消息发送间隔")]
        [DescriptionField(Size = 2, FieldType = FieldTypeEnum.Ushort, Description = "TC发送间隔")]
        public ushort U16TCInterval;

        [Description("TOP_HOLD_TIM与TC_INTVRVAL之间的倍数，默认值为3")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "TOP拓扑倍数")]
        public byte U8TOPHoldMultiple;

        [Description("保留位")]
        public byte u8Rsv2;

        [Description("MID消息发送间隔")]
        [DescriptionField(Size = 2, FieldType = FieldTypeEnum.Ushort, Description = "MID发送间隔")]
        public ushort u16MIDInterval;

        [Description("MID_HOLD_TIM与MID_INTVRVAL之间的倍数，默认值为3")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "MID拓扑倍数")]
        public byte u8MIDHoldMultiple;

        [Description("u8TCwholeinterval")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "TCwhole间隔")]
        public byte u8TCwholeinterval;

        [Description("TCWHOLE_HOLD_TIM与TCWHOLE_INTVRVAL之间的倍数，默认值为3")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "TCwhole倍数")]
        public byte u8TcwholeHoldMultiple;

        [Description("节点意愿度 0：WILL_NEVER;3：WILL_DEFAULT;7：WILL_ALWAYS;")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Enum, Description = "节点意愿", EnumType = typeof(EnumNodeWillingness))]
        public byte u8NodeWillingness;

        [Description("ratio_IfSNR")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "IfSNR频率")]
        public byte ratio_IfSNR;

        [Description("ratio_IfUseNum")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "IfUseNum频率")]
        public byte ratio_IfUseNum;

        [Description("HopNum频率")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "HopNum频率")]
        public byte ratio_HopNum;

        [Description("ratio_HopSNR")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "HopSNR频率")]
        public byte ratio_HopSNR;

        [Description("节点类型")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "节点类型")]
        public byte nodeType;

        [Description("保留")]
        public byte au8Rsv2;

        [Description("节点名称")]
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 4)]
        [DescriptionField(Size = 4, FieldType = FieldTypeEnum.String, Description = "节点名称")]
        public byte[] nodeName;
        //     [Description("信道质量参数Ch_quality计算过程中，链路信噪比SNR的权重系数a")]
        //public byte  ratio_SNR;
        //     [Description("信道质量参数Ch_quality计算过程中，链路传输时延DELAY的权重系数b")]
        //public byte  ratio_delay;
        //     [Description("信道质量参数Ch_quality计算过程中，链路丢包率PLR的权重系数")]
        //public byte  ratio_PLR;
        //     [Description("链路质量参数link_quality 计算过程信道质量Ch_quality中权重系数α")]
        //public byte  ratio_CH;
        //     [Description("链路质量参数link_quality 计算过程，节点负载load中权重系数δ")]
        //public byte  ratio_load;
        //     [Description("链路质量参数link_quality 计算过程，节点电量power中权重系数ε")]
        //public byte  ratio_power;
        //     [Description("路由权重值R_weight计算过程，跳数R_dist中权重系数β")]
        //public byte  ratio_HopNum;
        // [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
        //public byte[]  au8Rsv3;
    };

    // STRU_WIFI_PARAME
    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct STRU_WIFI_PARAME
    {
        //[Resolve(TdmResolveType.mystring)]
        [Description("网络名(SSID)")]
        [DescriptionField(Size = 32, FieldType = FieldTypeEnum.String, Description = "网络名")]
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 32)]
        public byte[] au8SSID;

        [Description("信道")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Enum, Description = "信道", EnumType = typeof(EnumChannel))]
        public byte u8Channel;

        [Description("信道带宽")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Enum, Description = "信道带宽", EnumType = typeof(EnumChanWid))]
        public byte u8ChanWid;


        [Description("发射功率")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Byte, Description = "发射功率")]
        public byte u8TxPower;

        [Description("加密方式")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Enum, Description = "加密方式", EnumType = typeof(EnumEncryptMode))]
        public byte u8EncryptMode;

        //[Resolve(TdmResolveType.mystring)]
        [Description("密钥")]
        [DescriptionField(Size = 32, FieldType = FieldTypeEnum.String, Description = "密钥")]
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 32)]
        public byte[] au8Key;

        [Description("网络接口类型")]
        [DescriptionField(Size = 1, FieldType = FieldTypeEnum.Enum, Description = "接口类型", EnumType = typeof(EnumNetwork))]
        public byte u8Network;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 3)]
        public byte[] au8Rsv;

        [Description("RTS门限")]
        [DescriptionField(Size = 4, FieldType = FieldTypeEnum.Int, Description = "RTS门限")]
        public int s32RtsThr;
        [Description("分片门限")]
        [DescriptionField(Size = 4, FieldType = FieldTypeEnum.Int, Description = "分片门限")]
        public int s32FragThr;
    };

    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct STRU_OMTDM_PARA_CNF
    {
        [Description("消息头")]
        public MsgHeader struMsgHeader;
    };
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    class MsgHeader
    {
        /// <summary>
        /// 消息ID
        /// </summary>
        ushort MsgID { get; set; }
        /// <summary>
        /// 保留
        /// </summary>
        ushort Rsv { get;set; }
        /// <summary>
        /// 源模块ID
        /// </summary>
        ushort SrcID { get; set; }
        /// <summary>
        /// 目标模块ID
        /// </summary>
        ushort DstID { get; set; }
        /// <summary>
        /// 数据部分指针
        /// </summary>
        int DataPointer { get; set; }
        /// <summary>
        /// 数据部分长度
        /// </summary>
        UInt32 DataLen { get; set; }
        /// <summary>
        /// 消息总长度，包括消息头和消息头之外的其他成员（如果有），但不含数据部分（default = 20+）
        /// </summary>
        UInt32 MsgLen { get; set; }
        /// <summary>
        /// 消息头之外的其他成员信息
        /// </summary>
        byte[] MsgHeaderExtInfo { get; set; }
    }
}

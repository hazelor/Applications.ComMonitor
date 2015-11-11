using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct MsgHeader
    {
        public ushort MsgID;
        public ushort serv;
        public ushort SrcID;
        public ushort DstID;
        public UInt32 puData;
        public UInt32 DataLen;
        public UInt32 MsgLen;
    }
}

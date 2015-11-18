using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct IpPortCFC
    {
        [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.U1, SizeConst = 16)]
        public byte[] IpAddr;
        public UInt32 PortNum;
    }
}
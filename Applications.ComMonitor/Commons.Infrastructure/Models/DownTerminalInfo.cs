using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    public struct RouteInfo
    {
        [Description("DstAddr")]
        [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.U1, SizeConst = 8)]
        public byte[] DstAddr;

        [Description("InterfaceAddr")]
        [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.U1, SizeConst = 8)]
        public byte[] InterfaceAddr;

        [Description("NextIfaceAddr")]
        [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.U1, SizeConst = 8)]
        public byte[] NextIfaceAddr;

        [Description("NextAddr")]
        [MarshalAs(UnmanagedType.ByValArray, ArraySubType = UnmanagedType.U1, SizeConst = 240)]
        public byte[] NextAddr;

        [Description("路由跳数")]
        public byte Dist;//路由跳数
        public byte Rsv;//保留

        [Description("系数")]
        public ushort Weight;//系数
        
    }
    public class DownTerminalInfo
    {
        public string IPAddr { get; set; }
        public int Port { get; set; }

        public ObservableCollection<RouteInfo> RouteInfo { get; set; }

        public int numRouteInfo;
        public void OnUpdate()
        {
            this.OnRoutInfoChanged(this, null);
        }

        public event EventHandler OnRoutInfoChanged;

    }
}

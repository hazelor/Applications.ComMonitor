using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    
    public class MacAddr
    {
        [DllImport("Iphlpapi.dll")]
        private static extern int SendARP(Int32 dest, Int32 host, ref IntPtr mac, ref IntPtr length);
        [DllImport("Ws2_32.dll")]
        private static extern Int32 inet_addr(string ip);

        public static MacAddr GetTerminalMac(string Terminalip, string Selfip)
        {
            return new MacAddr(new byte[] { 0xdc, 0xdc, 0xdc, 0xdc, 0xdc, 0 });
            //Int32 ldest = inet_addr(Terminalip);
            //Int32 lhost = inet_addr(Selfip);

            //try
            //{
            //    Byte[] macinfo=new Byte[6];  
            //    Int32 length=6;
            //    IntPtr mac = new IntPtr(macinfo[0]);
            //    IntPtr len = new IntPtr(length);
            //    int ii = SendARP(ldest, lhost, ref mac, ref len);

            //    return new MacAddr(macinfo);
            //}
            //catch (Exception)
            //{

            //    return null;
            //}
        }

        public static int MACADDRLEN = 8;
        public static int MACADDRLEN_SHORT = 6;

        public byte[] Src { get; set; }

        public string Addr { get; set; }

        public MacAddr()
        {
            Src = new byte[MACADDRLEN];
            Addr = "";
            foreach (var b in Src)
            {
                Addr += b.ToString("X2");
                //Addr += '';
            }
            //Addr = Addr.Remove(Addr.Length - 1);
        }

        public override string ToString()
        {
            return Addr;
        }
        public MacAddr(byte[] src)
        {
            System.Diagnostics.Debug.Assert(src.Length <= MACADDRLEN, "the macaddr length"+src.Length+" must small than " + MACADDRLEN.ToString());

            Src = new byte[src.Length];
            src.CopyTo(Src, 0);
            Addr = "";
            foreach (var b in Src)
            {
                Addr += b.ToString("X2");
                //Addr += '';
            }
            //Addr = Addr.Remove(Addr.Length - 1);

        }

        public override bool Equals(object obj)
        {
            MacAddr ma = obj as MacAddr;
            if (ma == null)
	        {
		        return false;
	        }
            return ma.Addr == this.Addr;
        }
    }
}

using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{

    public class MacAddr
    {
        public static int MACADDRLEN = 6;

        public byte[] Src { get; set; }

        public string Addr { get; set; }

        public MacAddr()
        {
            Src = new byte[MACADDRLEN];
            Addr = "";
            foreach (var b in Src)
            {
                Addr += b.ToString("X");
                Addr += '-';
            }
            Addr = Addr.Remove(Addr.Length - 1);
        }

        public MacAddr(byte[] src)
        {
            System.Diagnostics.Debug.Assert(src.Length == MACADDRLEN, "the macaddr length must be " + MACADDRLEN.ToString());

            Src = new byte[MACADDRLEN];
            src.CopyTo(Src, 0);
            Addr = "";
            foreach (var b in Src)
            {
                Addr += b.ToString("X");
                Addr += '-';
            }
            Addr = Addr.Remove(Addr.Length - 1);

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

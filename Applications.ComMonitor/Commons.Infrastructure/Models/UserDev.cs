using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class UserDev
    {
        public UserDev()
        {
            IPAddr = new byte[4];
        }
        public MacAddr MacAddr { get; set; }

        public byte[] IPAddr { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    [AttributeUsage(AttributeTargets.Method)]
    class ParserAttribute : Attribute
    {
        public ushort ParseID { get; set; }
        public string Description { get; set; }
    }
}

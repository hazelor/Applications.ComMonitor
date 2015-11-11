using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    static class ConstIDs
    {
        public const ushort O_TDMOM_IP_PORT_CFG = 0x1001;
        public const ushort O_TDMOM_IP_PORT_CNF = 0x2002;
        public const ushort O_TDMOM_ROUTE_INFO_REQ = 0x1004;
        public const ushort O_TDMOM_ROUTE_INFO_RSP = 0x2004;
        public const ushort O_TDMOM_TOP_INFO_REQ = 0x1005;
        public const ushort O_TDMOM_TOP_INFO_RSP = 0x2005;
        public const ushort O_OMTDM_ALL_USER_IND = 0x2006;
        public const ushort O_TDMOM_FREQ_ONOFF = 0x1005;

        public const ushort SRC_ID = 0x2000;
        public const ushort DST_ID = 0x1000;
    }
}

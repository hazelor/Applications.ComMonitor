using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public static class ConstIDs
    {
        public const ushort O_TDMOM_IP_PORT_CFG = 0x1001;
        public const ushort O_TDMOM_IP_PORT_CNF = 0x2002;

        public const ushort O_TDMOM_ROUTE_INFO_REQ = 0x1004;
        public const ushort O_TDMOM_ROUTE_INFO_RSP = 0x2004;

        public const ushort O_TDMOM_TOP_INFO_REQ = 0x1005;
        public const ushort O_TDMOM_TOP_INFO_RSP = 0x2005;

        public const ushort O_OMTDM_ALL_USER_IND = 0x2006;

        public const ushort O_TDMOM_FREQ_ONOFF = 0x1005;

        public const ushort O_TDMOM_FILTER_CFG = 0x1002;

        public const ushort O_TDMOM_PARA_CFG = 0x2003;
        public const ushort O_TDMOM_PARA_REQ = 0x1003;

        public const ushort STRU_OMTDM_FREQ_RSP = 0x2008;
        public const ushort STRU_TDMOM_FREQ_REQ = 0x1012;

        public const ushort SRC_ID = 0x2000;
        public const ushort DST_ID = 0x1000;

        public const ushort O_TDMOM_TRANSFER_TEST = 0x10a0;



        public const ushort DATA_TRANS_START_ASK = 0x1001;
        public const ushort DATA_TRANS_START_REQ = 0x2001;
        public const ushort DATA_TRANS_PROG_ASK = 0x1002;
        public const ushort DATA_TRANS_PROG_REQ = 0x2002;
        
        public const ushort DATA_TRANS_END_ASK = 0x1004;
        public const ushort DATA_TRANS_END_REQ = 0x2004;

        public const ushort DATA_TRANS_PAUSE_ASK = 0x1003;
        
    }
}

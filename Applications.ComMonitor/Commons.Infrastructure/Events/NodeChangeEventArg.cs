using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Events
{
    public enum Operations
    {
        ADD=1,
        DEL=2,
    }
    public class NodeChangeEventArg:EventArgs
    {
        public Operations oper { get; set; }

        public CommNode Node { get; set; }
    }

    public class LineChangeEventArg:EventArgs
    {
        public Operations oper { get; set; }
        public CommLine Line { get; set; }
    }
}

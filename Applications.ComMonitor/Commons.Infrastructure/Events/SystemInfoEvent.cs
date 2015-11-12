using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Events
{
    public class SystemInfoEvent : PubSubEvent<SystemInfos>
    {
    }

    public class SystemInfos
    {
        public string Info { get; set; }
        public DateTime Time { get; set; }
    }
}

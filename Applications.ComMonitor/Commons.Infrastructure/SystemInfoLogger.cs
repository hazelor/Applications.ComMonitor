using Commons.Infrastructure.Events;
using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure
{
    public static class SystemInfoLogger
    {
        public static void Logger(IEventAggregator ea, string info)
        {
            ea.GetEvent<SystemInfoEvent>().Publish(new SystemInfos { Info = info, Time = DateTime.Now });
        }
    }
}

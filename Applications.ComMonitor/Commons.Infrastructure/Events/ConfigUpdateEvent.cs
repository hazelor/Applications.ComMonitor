using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Events
{
    public class ConfigUpdateEvent : PubSubEvent<bool>
    {
    }

    public class ClearAllEvent : PubSubEvent<bool>
    {

    }

    public class ParamUpdatedEvent:PubSubEvent<STRU_TDMOM_PARA_CFG>
    {

    }
}

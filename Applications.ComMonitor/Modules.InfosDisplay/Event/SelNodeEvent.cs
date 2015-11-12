using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.InfosDisplay.Event
{
    public class SelNodeEvent :PubSubEvent<CommNode>
    {
    }

    public class SelLineEvent : PubSubEvent<CommLine>
    {
    }
}

using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProtocolService
{
    public class RecievedEvent:PubSubEvent<byte[]>
    {
    }
}

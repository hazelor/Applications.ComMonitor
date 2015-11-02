using Commons.Infrastructure.Events;
using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Commons.Infrastructure.Interface
{
    public interface IProtocolService
    {
        DownTerminalInfo DTerminalInfo { get; }
        CommNet CommunicationNet { get; }

        event EventHandler<NodeChangeEventArg> NodeChangeEvent;
        event EventHandler<LineChangeEventArg> LineChangeEvent;
    }
}

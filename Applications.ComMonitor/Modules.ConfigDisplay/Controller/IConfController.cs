using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay.Controller
{
    interface IConfController
    {

        void AddSubConfPanel(IConfViewModel subPanelViewModel);

        bool IsAviableApply { get; set; }

        event EventHandler<EventArgs> IsAvailableApplyHandler;

        void AddNotificationCommand();
    }
}

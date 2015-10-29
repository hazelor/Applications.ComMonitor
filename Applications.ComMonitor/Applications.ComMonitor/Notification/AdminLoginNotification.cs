using Microsoft.Practices.Prism.Interactivity.InteractionRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.ComMonitor.Notification
{
    public class AdminLoginNotification : Confirmation
    {

        public string AdminName { get; set; }

        public string AdminPassword { get; set;}

        public string AdminNameInput { get; set; }
        public string AdminPasswordInput { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class DownTerminalInfo
    {
        public string IPAddr { get; set; }
        public int Port { get; set; }

        public ObservableCollection<MacAddr> RouteInfo { get; set; }

        /// <summary>
        /// 路由跳数
        /// </summary>
        public int Dist { get; set; }

        public int Weight { get; set; }


    }
}

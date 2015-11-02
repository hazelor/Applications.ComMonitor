using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class CommNet
    {
        public ushort NodeNum { get; set; }

        public ObservableCollection<CommNode> CommNodes { get; set; }

        public ObservableCollection<CommLine> CommLines { get; set; }

        public ObservableCollection<UserDev> UserDevs { get; set; }
    }
}

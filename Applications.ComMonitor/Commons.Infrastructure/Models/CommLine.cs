using Hazelor.MapCtrl.Interfaces;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public enum CommStatues
    {
        NON = 0,
        BAD = 1,
        NORMAL=2,
        GOOD=3,
        EXCELLENT=4,
    }
    public class CommLine : BindableBase, ILineOjbectContext
    {
        public string Key { get { return string.Format("{0},{1}", StartNode.Index, EndNode.Index); } }
        public CommNode StartNode { get; set; }

        public CommNode EndNode { get; set; }

        public double Latitude { get { return StartNode.Latitude; } set { StartNode.Latitude = value; this.OnPropertyChanged("Latitude"); } }
        public double Longitude { get { return StartNode.Longitude; } set { StartNode.Longitude = value; this.OnPropertyChanged("Longitude"); } }

        public double EndLatitude { get { return EndNode.Latitude; } set { EndNode.Latitude = value; this.OnPropertyChanged("EndLatitude"); } }
        public double EndLongitude { get { return EndNode.Longitude; } set { EndNode.Longitude = value; this.OnPropertyChanged("EndLongitude"); } }

        public CommStatues CommStatuPre { get; set; }
        public CommStatues CommStatuBac { get; set; }

        public bool IsVisible { get { return (int)CommStatuPre + (int)CommStatuBac > 0; } }

        public override string ToString()
        {
            return StartNode.ToString() + EndNode.ToString();
        }
    }
}

using Hazelor.MapCtrl.Interfaces;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
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

    [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Auto, Pack = 1)]
    public struct LINE_INFO
    {
        [Description("信号质量")]
        public byte InfoQuality;
        [Description("白噪声信号质量")]
        public byte WhiteInfoQuality;
        [Description("信噪比")]
        public byte SignalNoiseRatio;
        [Description("使用情况，0未使用，1使用")]
        public byte IsUsed;
    }
    public class CommLine : BindableBase, ILineOjbectContext
    {

        public string Key { get { return string.Format("{0},{1}", StartNode.Index, EndNode.Index); } }
        private CommNode _StartNode;
        public CommNode StartNode { 
            get 
            { 
                return this._StartNode;
            } 
            set 
            { 
                this._StartNode = value;
                this._StartNode.GPSChangedEvent += OnStartNodeChanged;
            }
        }

        private CommNode _EndNode;
        public CommNode EndNode { 
            get 
            { 
                return this._EndNode;
            } 
            set 
            {
                this._EndNode = value;
                this._EndNode.GPSChangedEvent += OnEndNodeChanged;
            } 
        }

        private void OnStartNodeChanged(object sender, EventArgs e)
        {
            this.OnPropertyChanged("Latitude");
            this.OnPropertyChanged("Longitude");
        }
        private void OnEndNodeChanged(object sender, EventArgs e)
        {
            
            this.OnPropertyChanged("EndLatitude");
            this.OnPropertyChanged("EndLongitude");
        }
        public double Latitude { get { return StartNode.Latitude; } set { StartNode.Latitude = value; this.OnPropertyChanged("Latitude"); } }
        public double Longitude { get { return StartNode.Longitude; } set { StartNode.Longitude = value; this.OnPropertyChanged("Longitude"); } }

        public double EndLatitude { get { return EndNode.Latitude; } set { EndNode.Latitude = value; this.OnPropertyChanged("EndLatitude"); } }
        public double EndLongitude { get { return EndNode.Longitude; } set { EndNode.Longitude = value; this.OnPropertyChanged("EndLongitude"); } }

        public CommStatues CommStatuPre { get; set; }
        public CommStatues CommStatuBac { get; set; }

        private LINE_INFO _LineInfoPre;

        private LINE_INFO _LineInfoBac;
        public LINE_INFO LineInfoPre { 
            get { 
            return this._LineInfoPre;
            } 
            set {
                _LineInfoPre = value;
                this.OnPropertyChanged("PreInfoQuality");
                this.OnPropertyChanged("PreSignalNoiseRatio");
                this.OnPropertyChanged("PreWhiteInfoQuality");
                this.OnPropertyChanged("PreIsUsed");
            } 
        }

        public LINE_INFO LineInfoBac {
            get
            {
                return this._LineInfoBac;
            }
            set
            {
                _LineInfoBac = value;
                this.OnPropertyChanged("BacInfoQuality");
                this.OnPropertyChanged("BacSignalNoiseRatio");
                this.OnPropertyChanged("BacWhiteInfoQuality");
                this.OnPropertyChanged("BacIsUsed");
            }
        }

        public int PreInfoQuality { get { return this.LineInfoPre.InfoQuality; } }
        public int BacInfoQuality { get { return this.LineInfoBac.InfoQuality; } }

        public int PreSignalNoiseRatio { get { return this.LineInfoPre.SignalNoiseRatio; } }
        public int BacSignalNoiseRatio { get { return this.LineInfoBac.SignalNoiseRatio; } }

        public int PreWhiteInfoQuality { get { return this.LineInfoPre.WhiteInfoQuality; } }
        public int BacWhiteInfoQuality { get { return this.LineInfoBac.WhiteInfoQuality; } }

        public int PreIsUsed { get { return this.LineInfoPre.IsUsed; } }
        public int BacIsUsed { get { return this.LineInfoBac.IsUsed; } }

        public bool IsVisible { get { return (int)CommStatuPre + (int)CommStatuBac > 0; } }

        public override string ToString()
        {
            return StartNode.ToString() + EndNode.ToString();
        }
    }
}

using Hazelor.MapCtrl.Interfaces;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class CommNode : BindableBase, ISingleObjectContext
    {

        /// <summary>
        /// 节点位置索引信息
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// 节点的Mac地址
        /// </summary>
        public MacAddr MacAddr { get; set; }


        private double _Longitude = double.PositiveInfinity;
        private double _Latitude = double.PositiveInfinity;
        private double _Altitude = double.PositiveInfinity;
        private int _NodeType = 0;

        public double Longitude { get { return this._Longitude; } set { SetProperty(ref this._Longitude, value); } }

        public double Latitude { get { return this._Latitude; } set { SetProperty(ref this._Latitude, value); } }

        public double Altitude { get { return this._Altitude; } set { SetProperty(ref this._Altitude, value); } }

        public int NodeType { get { return this._NodeType; } set { SetProperty(ref this._NodeType, value);} }

        public bool IsUpdate { get; set; }

        public override string ToString()
        {
            return MacAddr.Addr;
        }
    }
}

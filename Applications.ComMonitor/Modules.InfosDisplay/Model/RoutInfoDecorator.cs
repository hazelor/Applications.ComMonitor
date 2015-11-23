using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.InfosDisplay.Model
{
    public class RoutInfoDecorator:BindableBase
    {
        public string RoutName{get;set;}

        private RouteInfo _info;
        public RouteInfo info { 
            get
            { 
                return _info;
            } 
            set 
            { 
                this._info = value; 
                this.OnPropertyChanged("DstAddr");
                this.OnPropertyChanged("InterfaceAddr");
                this.OnPropertyChanged("NextIfaceAddr");
                this.OnPropertyChanged("NextAddr");
                this.OnPropertyChanged("Dist");
                this.OnPropertyChanged("Weight");
            }
        }

        public string DstAddr
        {
            get
            {
                return GetString(info.DstAddr);
            }
        }

        public string InterfaceAddr
        {
            get
            {
                return GetString(info.InterfaceAddr);
            }
        }

        public string NextIfaceAddr
        {
            get
            {
                return GetString(info.NextIfaceAddr);
            }
        }

        public string NextAddr
        {
            get
            {
                string res = "";
                if (info.NextAddr.Length <240)
                {
                    return res;
                }
                byte[] tmp = new byte[8];
                for (int i = 0; i < (info.Dist<30?info.Dist:30); i++)
                {
                    Buffer.BlockCopy(info.NextAddr, i * 8, tmp, 0, 8);
                    res += GetString(tmp); ;
                    res+='\n';
                }
                return res;
            }
        }

        public string Dist
        {
            get
            {
                return info.Dist.ToString();
            }
        }

        public string Weight
        {
            get
            {
                return info.Weight.ToString();
            }
        }

        private string GetString(byte[] info)
        {
            string res = "";
            for (int i = 0; i < info.Length; i++)
            {
                res += info[i].ToString("X2");
            }
            return res;
        }
    }

    
}

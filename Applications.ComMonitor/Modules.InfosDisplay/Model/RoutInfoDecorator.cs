using Commons.Infrastructure.Interface;
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
                this.OnPropertyChanged("DstName");
                this.OnPropertyChanged("InterfaceName");
                this.OnPropertyChanged("NextIfaceName");
                this.OnPropertyChanged("NextNames");
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
        public string DstName
        {
            get;
            set;
        }
        public string InterfaceAddr
        {
            get
            {
                return GetString(info.InterfaceAddr);
            }
        }
        public string InterfaceName
        {
            get;
            set;
        }
        public string NextIfaceAddr
        {
            get
            {
                return GetString(info.NextIfaceAddr);
            }
        }
        public string NextIfaceName
        {
            get;
            set;
        }

        public string NextNames
        {
            get;
            set;
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
                    res += GetString(tmp);
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
            for (int i = 0; i < info.Length-2; i++)
            {
                res += info[i].ToString("X2");
            }
            return res;
        }

        public void GetNames(IProtocolService ps)
        {
            byte[] tmp = new byte[6];
            Buffer.BlockCopy(info.DstAddr, 0, tmp, 0, 6);
            this.DstName = ps.GetName(new MacAddr(tmp));
            Buffer.BlockCopy(info.InterfaceAddr, 0, tmp, 0, 6);
            this.InterfaceName = ps.GetName(new MacAddr(tmp));
            Buffer.BlockCopy(info.NextIfaceAddr, 0, tmp, 0, 6);
            this.NextIfaceName = ps.GetName(new MacAddr(tmp));
            this.NextNames = "";
            if (info.NextAddr.Length < 240)
            {
                return;
            }
            for (int i = 0; i < (info.Dist < 30 ? info.Dist : 30); i++)
            {
                Buffer.BlockCopy(info.NextAddr, i * 8, tmp, 0, 6);
                NextNames += ps.GetName(new MacAddr(tmp));
                NextNames += '\n';
            }

        }
        
    }

    
}

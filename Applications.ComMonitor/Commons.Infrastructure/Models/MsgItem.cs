using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class MsgItem:BindableBase
    {
        public ushort ID { get; set; }

        public string Name { get; set; }

        private bool _Filter;
        public bool Filter
        {
            get
            {
                return this._Filter;
            }
            set
            {
                this._Filter = value;
                this.OnPropertyChanged("Filter");
               // SetProperty(ref , value);
                if (FilterChangedEvent == null)
                {
                    return;
                }
                FilterChangedEvent(this, this._Filter);
            }
        }

        public event EventHandler<bool> FilterChangedEvent;
        public int Core { get; set; }
    }

    public class BaseNameItem :BindableBase
    {
        public string BaseName { get; set; }

        public List<MsgItem> MsgItems { get; set; }

        private bool _Filter = false;
        public bool Filter {
            get
            {
                return this._Filter;
            }
            set 
            {
                this._Filter = value;
                if (MsgItems!= null)
                {
                    foreach (var item in MsgItems)
                    {
                        item.Filter = this._Filter;
                    }
                }
                this.OnPropertyChanged("Filter");
            }
        }

        public void RegisterFilterChanged()
        {
            if (MsgItems!= null)
            {
                foreach (var item in MsgItems)
                {
                    item.FilterChangedEvent += FilterChanged;
                }
            }
        }

        private void FilterChanged(object sender, bool filter)
        {
            //bool res = true;
            //foreach (var item in MsgItems)
            //{
            //    res &= item.Filter;
            //}
            //this._Filter = res;
            this.OnPropertyChanged("Filter");
        }
    }
}

using Applications.ComMonitor.Notification;
using Commons.Infrastructure.Interactions;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.ComMonitor.Interactions
{
    public class ConfigInterationViewModel : IGenericViewModel<ConfigNotification>
    {
        public ConfigNotification Entity
        {
            get;
            set;
        }

        public void SetEntity(ConfigNotification entity)
        {
            this.Entity = entity;
            this.OnPropertyChanged("Entity");
        }

        public ConfigNotification GetEntity()
        {
            return this.Entity;
        }

        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;

        public void OnPropertyChanged(string property)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(property));
        }

    }
}

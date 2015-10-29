using Applications.ComMonitor.Notification;
using Commons.Infrastructure.Interactions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.ComMonitor.Interactions
{
    class ConfigAdapter : IGenericAdapter<ConfigNotification>
    {
        private readonly IGenericViewModel<ConfigNotification> viewModel;

        public ConfigAdapter()
        {
            this.viewModel = new ConfigInterationViewModel();
        }

        public IGenericViewModel<ConfigNotification> ViewModel
        {
            get { return this.viewModel; }
        }

        public void SetEntity(ConfigNotification entity)
        {
            this.ViewModel.SetEntity(entity);
        }

        public ConfigNotification GetEntity()
        {
            return this.ViewModel.GetEntity();
        }
    }
}

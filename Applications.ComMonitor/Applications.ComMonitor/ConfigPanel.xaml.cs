using Applications.ComMonitor.Interactions;
using Applications.ComMonitor.Notification;
using Commons.Infrastructure;
using Commons.Infrastructure.Command;
using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interactions;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.Prism.Regions;
using Microsoft.Practices.ServiceLocation;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Applications.ComMonitor
{
    /// <summary>
    /// Interaction logic for ConfigPanel.xaml
    /// </summary>
    public partial class ConfigPanel : ConfigInterationDialog, IGenericInteractionView<ConfigNotification>, IGenericAdapter<ConfigNotification>
    {
        private readonly IGenericAdapter<ConfigNotification> adapter;
        public ConfigPanel()
        {
            this.adapter = new ConfigAdapter();
            this.DataContext = this.ViewModel;
            InitializeComponent();
            _eventAggregator = ServiceLocator.Current.GetInstance<IEventAggregator>();
        }

        private IEventAggregator _eventAggregator;
        public void SetEntity(ConfigNotification entity)
        {
            this.ViewModel.SetEntity(entity);
        }

        public ConfigNotification GetEntity()
        {
            return this.ViewModel.GetEntity();
        }

        public IGenericViewModel<ConfigNotification> ViewModel
        {
            get { return this.adapter.ViewModel; }
        }
        //[Import]
        //IRegionManager _regionManager;
        public override void Ok()
        {
            ConfigNotification an = this.ViewModel.GetEntity();
            ConfCommands.ApplyConfCommand.Execute(null);
            for (int i = 0; i < ConfCommands.ApplyConfCommand.RegisteredCommands.Count; i++)
			{
                ConfCommands.ApplyConfCommand.UnregisterCommand(ConfCommands.ApplyConfCommand.RegisteredCommands[i]);
                i--;
			}
            _eventAggregator.GetEvent<ConfirmEvent>().Publish(true);
            base.Ok();

        }

        public override void Cancel()
        {
            for (int i = 0; i < ConfCommands.ApplyConfCommand.RegisteredCommands.Count; i++)
            {
                ConfCommands.ApplyConfCommand.UnregisterCommand(ConfCommands.ApplyConfCommand.RegisteredCommands[i]);
                i--;
            }
            _eventAggregator.GetEvent<ConfirmEvent>().Publish(true);
            base.Cancel();
        }

        
        private void OnConfirmedUpdate(bool isConfirmed)
        {
            if (isConfirmed)
            {
                this.Ok();
            }
            else
            {
                this.Cancel();
            }
            
        }
    }
}

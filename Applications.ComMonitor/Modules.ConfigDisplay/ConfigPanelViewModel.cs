using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.ServiceLocation;
using Modules.ConfigDisplay.Command;
using Modules.ConfigDisplay.Controller;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay
{
    [Export]
    class ConfigPanelViewModel : BindableBase
    {

        #region Command
        public DelegateCommand ComfirmCommand { get; set; }
        public DelegateCommand CancelCommand { get; set; }

        private void ConfirmExecuted()
        {
            //保存config
            ConfCommands.ApplyConfCommand.Execute(null);
            _eventAggregator.GetEvent<ConfirmEvent>().Publish(true);

        }

        private void CancelExecuted()
        {
            //并不保存
            _eventAggregator.GetEvent<ConfirmEvent>().Publish(false);
        }

        
        #endregion

        #region Properties
        private IConfigService _configService;
        private IConfController _confController;

        private bool _IsAvailableApply = false;
        public bool IsAvailableApply
        {
            get
            {
                return this._IsAvailableApply;
            }
            set
            {
                SetProperty(ref this._IsAvailableApply, value);
            }
        }
        #endregion
        private IEventAggregator _eventAggregator;
        [ImportingConstructor]
        public ConfigPanelViewModel(IEventAggregator eventAggregator, IConfigService configService, IConfController confController)
        {
            _configService = configService;
            _confController = confController;
            _eventAggregator = eventAggregator;
            ComfirmCommand = new DelegateCommand(ConfirmExecuted);
            CancelCommand = new DelegateCommand(CancelExecuted);

            _confController.IsAvailableApplyHandler += OnIsAvailableApplyChanged;
           
        }
        public void Init()
        { 
            //添加各个subViewModel

            IConfViewModel vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.ConnectSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.LinkStateSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.MapSetting);
            _confController.AddSubConfPanel(vm);

            //读取config从文件
        }
        private void OnIsAvailableApplyChanged(object sender, EventArgs e)
        {
            IsAvailableApply = _confController.IsAviableApply;
        }
    }
}

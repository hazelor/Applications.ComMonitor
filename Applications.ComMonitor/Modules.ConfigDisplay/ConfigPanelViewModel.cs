using Commons.Infrastructure;
using Commons.Infrastructure.Command;
using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.ServiceLocation;
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

            _eventAggregator.GetEvent<ConfirmEvent>().Subscribe(ClearViewModel);
            _confController.IsAvailableApplyHandler += OnIsAvailableApplyChanged;
           
        }

        private void ClearViewModel(bool sign)
        {
            _confController.RemoveAllViewModel();
        }
        public void Init()
        {
            IConfViewModel vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.ConnectSetting);
            _confController.AddSubConfPanel(vm);
            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.LinkStateSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.MapSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.MsgFilterSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.WIFICtrlSetting);
            _confController.AddSubConfPanel(vm);

            vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.MapDownload);
            _confController.AddSubConfPanel(vm);

            //添加各个subViewModel
            if (_configService.IsAdminLogin)
            {
                vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.ConfigurationSetting);
                _confController.AddSubConfPanel(vm);

            }
            else
            {
                vm = ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.UserSetting);
                _confController.AddSubConfPanel(vm);
            }
            

            

            //添加通知操作
            _confController.AddNotificationCommand();

            //初始化界面
            _confController.InitViewModels();

            //读取config从文件
        }
        private void OnIsAvailableApplyChanged(object sender, EventArgs e)
        {
            IsAvailableApply = _confController.IsAviableApply;
        }
    }
}

using Applications.ComMonitor.Notification;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Commons.Infrastructure.Requests;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Interactivity.InteractionRequest;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.ComMonitor
{
    [Export]
    class ShellViewModel :BindableBase
    {
        #region Commands
        public DelegateCommand ConfigDisplayCommand { get; set; }

        private void ConfigDisplayExecuted()
        {
            AdminLoginNotification notification = new AdminLoginNotification();
            
            notification.AdminName = this._adminInfo.Name;
            notification.AdminNameInput = this._adminInfo.Name;
            notification.AdminPassword = this._adminInfo.Password;
            notification.Title = "管理员登录";

            this.AdminLoginRequest.Raise(notification, GetAdminLoginCallBack, CancelAdminLoginCallBack);

        }


        #endregion

        #region notification
        public GenericInteractionRequest<AdminLoginNotification> AdminLoginRequest { get; private set; }

        public GenericInteractionRequest<ConfigNotification> ConfigRequest { get; private set; }
        #endregion

        #region Admin
        
        private void GetAdminLoginCallBack(AdminLoginNotification a)
        {
            ConfigNotification notification = new ConfigNotification();
            this.ConfigRequest.Raise(notification, GetConfigCallBack, CancelConfigCallBack);
        }
        private void CancelAdminLoginCallBack()
        {

        }
        #endregion

        #region Config

        private void GetConfigCallBack(ConfigNotification c)
        {

        }

        private void CancelConfigCallBack()
        {

        }

        #endregion
        private IEventAggregator _eventAggregator;
        private IConfigService _configService;
        private AdminInfo _adminInfo;
        [ImportingConstructor]
        public ShellViewModel(IEventAggregator eventAggregator, IConfigService configService)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            _adminInfo = _configService.AdminInfos;
            ConfigDisplayCommand = new DelegateCommand(ConfigDisplayExecuted);
            AdminLoginRequest = new GenericInteractionRequest<AdminLoginNotification>();
            ConfigRequest = new GenericInteractionRequest<ConfigNotification>();
            //注册消息

        }
    }
}

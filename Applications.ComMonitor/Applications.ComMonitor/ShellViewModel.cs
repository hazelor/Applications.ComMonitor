using Applications.ComMonitor.Notification;
using Commons.Infrastructure;
using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Commons.Infrastructure.Requests;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Interactivity.InteractionRequest;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.ServiceLocation;
using Modules.TopologyDisplay;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;

namespace Applications.ComMonitor
{
    [Export]
    class ShellViewModel :BindableBase
    {
        #region Commands
        public DelegateCommand ConfigDisplayCommand { get; set; }

        private void ConfigDisplayExecuted()
        {
            //AdminLoginNotification notification = new AdminLoginNotification();
            
            //notification.AdminName = this._adminInfo.Name;
            //notification.AdminNameInput = this._adminInfo.Name;
            //notification.AdminPassword = this._adminInfo.Password;
            //notification.Title = "管理员登录";

            //this.AdminLoginRequest.Raise(notification, GetAdminLoginCallBack, CancelAdminLoginCallBack);
            ConfigNotification notification = new ConfigNotification();
            this.ConfigRequest.Raise(notification, GetConfigCallBack, CancelConfigCallBack);
        }

        public DelegateCommand DataTransCommand { get; set; }
        private void DataTransExecuted()
        {
            //_DataTransPanel.ShowWnd(Application.Current.MainWindow);
            //ServiceLocator.Current.GetInstance<IDataTransPanel>().ShowWnd(Application.Current.MainWindow);
            DataTransPanel.ShowWnd(Application.Current.MainWindow);
        }
        #endregion

        #region notification
        public GenericInteractionRequest<AdminLoginNotification> AdminLoginRequest { get; private set; }

        public GenericInteractionRequest<ConfigNotification> ConfigRequest { get; private set; }
        #endregion

        #region Admin
        
        private void GetAdminLoginCallBack(AdminLoginNotification a)
        {
            
            
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
        private IProtocolService _protocolService;
        //private IDataTransPanel _DataTransPanel;
        private AdminInfo _adminInfo;
        [ImportingConstructor]
        public ShellViewModel(IEventAggregator eventAggregator, IConfigService configService, IProtocolService protocolService)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            _protocolService = protocolService;
           // _DataTransPanel = dataTransPanel;
            _protocolService.IsStartChannelChangeEvent += OnIsStartChannelUpdate;
            //_protocolService.StartChannel();
            _adminInfo = _configService.AdminInfos;
            ConfigDisplayCommand = new DelegateCommand(ConfigDisplayExecuted);
            DataTransCommand = new DelegateCommand(DataTransExecuted);

            AdminLoginRequest = new GenericInteractionRequest<AdminLoginNotification>();
            ConfigRequest = new GenericInteractionRequest<ConfigNotification>();
            //注册消息
            _eventAggregator.GetEvent<SystemInfoEvent>().Subscribe(OnSystemInfoUpdate);
            StartCommand = new DelegateCommand(StartExecuted);

            //init Filter ViewModel
            ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.MsgFilterSetting);


        }
        private bool _IsEnableConf= true;
        public bool IsEnableConf
        {
            get
            {
                return this._IsEnableConf;
            }
            set
            {
                SetProperty(ref this._IsEnableConf, value);
            }
        }
        public Visibility InfoVisible
        {
            get
            {
                if (_configService.IsAdminLogin)
                {
                    return Visibility.Visible;
                }
                else
                {
                    return Visibility.Collapsed;
                }
            }
        }
        private void OnIsStartChannelUpdate(object sender, bool IsStartChannel)
        {
            if (IsStartChannel)
            {
                StartName = "结束";
                IsEnableConf = false;
            }
            else
            {
                StartName = "开始";
                IsEnableConf = true;
            }
        }
        public DelegateCommand StartCommand { get; set; }

        private void StartExecuted()
        {
            if (_StartName == "开始")
            {
                StartName = "结束";
                //Thread.Sleep(3000);
                _protocolService.StartChannel();
                _eventAggregator.GetEvent<SystemInfoEvent>().Publish(new SystemInfos { Info = "与下位机通信开始!", Time = DateTime.Now });
            }
            else
            {
                StartName = "开始";
                _protocolService.StopChannel();
                _eventAggregator.GetEvent<SystemInfoEvent>().Publish(new SystemInfos { Info = "与下位机通信停止!", Time = DateTime.Now });
            }
        }

        private string _StartName = "开始";
        public string StartName
        {
            get
            {
                return this._StartName;
            }
            set
            {
                SetProperty(ref this._StartName, value);
            }
        }

        private string _SystemInfo = "系统初始化成功！";
        public string SystemInfo
        {
            get
            {
                return this._SystemInfo;
            }
            set
            {
                SetProperty(ref this._SystemInfo, value);
            }
        }

        private void OnSystemInfoUpdate(SystemInfos s)
        {
            SystemInfo = s.ToString();
        }
    }
}

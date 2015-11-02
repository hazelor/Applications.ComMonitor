using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.ConnectSetting, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class ConnectSettingViewModel : SubConfViewModelBase
    {
        
        [ImportingConstructor]
        public ConnectSettingViewModel(IConfigService configService)
        {
            _configService = configService;
            ApplyCommand = new DelegateCommand(ApplyExecuted);
            Uri = PanelNames.ConnectSettingPanel;
            Name = "连接设置";
            InitConfig();
        }

        private void ApplyExecuted()
        {
            if (_IsBig)
            {
                _configService.ConfigInfos.CPUType = ConfigItems.BIG;
            }
            else
            {
                _configService.ConfigInfos.CPUType = ConfigItems.LITTLE;
            }

            if (_IsTcp)
            {
                _configService.ConfigInfos.CommProtocol = ConfigItems.TCP;
            }
            else
            {
                _configService.ConfigInfos.CommProtocol = ConfigItems.UDP;
            }

            if (_IsClient)
            {
                _configService.ConfigInfos.CommType = ConfigItems.CLINET;
            }
            else
            {
                _configService.ConfigInfos.CommType = ConfigItems.SERVER;
            }

            _configService.ConfigInfos.DownTerminalIP = this.DownTerminalIP;
            _configService.ConfigInfos.TermialIP = this.TerminalIP;

            _configService.SaveConfigCommand.Execute(null);

            IsAvaibleApply = false;
            BaseApplyAvailableUpdate(IsAvaibleApply);
        }

       

        private void InitConfig()
        {
            _DownTerminalIP = _configService.ConfigInfos.DownTerminalIP;
            _TerminalIP = _configService.ConfigInfos.TermialIP;
            _IsBig = _configService.ConfigInfos.CPUType == ConfigItems.BIG;
            _IsLittle = !_IsBig;

            _IsClient = _configService.ConfigInfos.CommType == ConfigItems.CLINET;
            _IsServer = !_IsClient;

            _IsUdp = _configService.ConfigInfos.CommProtocol == ConfigItems.UDP;
            _IsTcp = !_IsUdp;

        }
        #region properties

        private bool _IsTcp;
        public bool IsTcp
        {
            get
            {
                return this._IsTcp;
            }
            set
            {

                SetProperty(ref this._IsTcp, value);
                SetApplySign();
            }
        }

        private bool _IsUdp;
        public bool IsUdp
        {
            get
            {
                return this._IsUdp;
            }
            set
            {
                SetProperty(ref this._IsUdp, value);
                SetApplySign();
            }
        }

        private bool _IsBig;
        public bool IsBig
        {
            get
            {
                return this._IsBig;
            }
            set
            {
                SetProperty(ref this._IsBig, value);
                SetApplySign();
            }
        }

        private bool _IsLittle;
        public bool IsLittle
        {
            get
            {
                return this._IsLittle;
            }
            set
            {
                SetProperty(ref this._IsLittle, value);
                SetApplySign();
            }
        }

        private bool _IsClient;
        public bool IsClient
        {
            get
            {
                return this._IsClient;
            }
            set
            {
                SetProperty(ref this._IsClient, value);
                SetApplySign();
            }
        }

        private bool _IsServer;
        public bool IsServer
        {
            get
            {
                return this._IsServer;
            }
            set
            {
                SetProperty(ref this._IsServer, value);
                SetApplySign();
            }
        }

        private string _DownTerminalIP;
        public string DownTerminalIP
        {
            get
            {
                return this._DownTerminalIP;
            }
            set
            {
                SetProperty(ref _DownTerminalIP, value);
                SetApplySign();
            }
        }

        private string _TerminalIP;
        public string TerminalIP
        {
            get
            {
                return this._TerminalIP;
            }
            set
            {
                SetProperty(ref _TerminalIP, value);
                SetApplySign();
            }
        }
        #endregion

    }
}

using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.ServiceLocation;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.UserSetting, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class UserSettingViewModel : SubConfViewModelBase
    {
        private IProtocolService _protocolService;
        private IConfigService _configService;
        private ConfigurationSettingViewModel _configSettingVM;
        [ImportingConstructor]
        public UserSettingViewModel(IProtocolService protocolService, IConfigService configService)
        {
            _protocolService = protocolService;
            _configService = configService;
            ApplyCommand = new DelegateCommand(ApplyExecuted);
            Uri = PanelNames.UserSettingPanel;
            Name = "板卡名称设置";

            _protocolService.IPSettingSuccessMsgReceiveEvent += OnIPSettingSuccessMsgReceiveEvent;
            ConfSettingCommand = new DelegateCommand(ConfSettingExecuted);
            _configSettingVM = (ConfigurationSettingViewModel)ServiceLocator.Current.GetInstance<IConfViewModel>(PanelNames.ConfigurationSetting);
            //_TerminalName = System.Text.Encoding.Default.GetString(_configSettingVM.OLSESettingInfo.Instance.nodeName);
            //_TerminalName = _protocolService.GetName(MacAddr.SelfMacAddr);
            //_TerminalName = _TerminalName.TrimEnd((char)0);
        }

        private string _TerminalName = "";
        public string TerminalName
        {
            get
            {
                return this._TerminalName;
            }
            set
            {
                SetProperty(ref this._TerminalName, value);
            }
        }

        private void OnIPSettingSuccessMsgReceiveEvent(object sender, EventArgs e)
        {
            TerminalName = _protocolService.GetName(MacAddr.SelfMacAddr);
            TerminalName = TerminalName.TrimEnd((char)0);
        }
        private void ApplyExecuted()
        {
        }
        public DelegateCommand ConfSettingCommand { get; set; }

        private void ConfSettingExecuted()
        {
            byte[] tmpNameBuffer = new byte[4] { 0, 0, 0, 0 };
            Buffer.BlockCopy(_configSettingVM.OLSESettingInfo.Instance.nodeName, 0, _configSettingVM.OLSESettingInfo.Instance.nodeName, 0, tmpNameBuffer.Length > 4 ? 4 : tmpNameBuffer.Length);
            tmpNameBuffer = System.Text.Encoding.Default.GetBytes(TerminalName);
            Buffer.BlockCopy(tmpNameBuffer, 0, _configSettingVM.OLSESettingInfo.Instance.nodeName, 0, tmpNameBuffer.Length > 4 ? 4 : tmpNameBuffer.Length);
            _configSettingVM.ConfSettingExecuted();
        }

    }
}

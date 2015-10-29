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
        }

        private void ApplyExecuted()
        {

        }
        
    }
}

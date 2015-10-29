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
    [Export(PanelNames.LinkStateSetting, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class LinkStateSettingViewModel : SubConfViewModelBase
    {
        
        [ImportingConstructor]
        public LinkStateSettingViewModel(IConfigService configService)
        {
            _configService = configService;
            Uri = PanelNames.LinkStateSettingPanel;
            Name = "拓扑设置";
            ApplyCommand = new DelegateCommand(ApplyExecuted);
        }

        private void ApplyExecuted()
        {

        }
    }
}

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
    [Export(PanelNames.MapSetting,typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class MapSettingViewModel : SubConfViewModelBase
    {
        
        [ImportingConstructor]
        public MapSettingViewModel(IConfigService configService)
        {
            _configService = configService;
            Uri = PanelNames.MapSettingPanel;
            Name = "地图设置";
            ApplyCommand = new DelegateCommand(ApplyExecuted);

        }

        private void ApplyExecuted()
        {

        }
    }
}

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
            _configService.ConfigInfos.UpdateRate = this.UpdateRate;

            _configService.SaveConfigCommand.Execute(null);
            IsAvaibleApply = false;
            BaseApplyAvailableUpdate(IsAvaibleApply);
        }

        #region Perperties

        private int _UpdateRate;
        public int UpdateRate
        {
            get
            {
                return this._UpdateRate;
            }
            set
            {
                SetProperty(ref this._UpdateRate, value);
                SetApplySign();
            }
        }
        #endregion
    }
}

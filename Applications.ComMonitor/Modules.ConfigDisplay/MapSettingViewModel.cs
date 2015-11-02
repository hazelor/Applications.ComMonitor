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
            ChangeBackCommand = new DelegateCommand<string>(ChangeBackExecuted);
        }

        private void ApplyExecuted()
        {
            _configService.ConfigInfos.CenteredLatitude = this.CenterLatitude;
            _configService.ConfigInfos.CenteredLongitude = this.CenterLongitude;
            _configService.ConfigInfos.MapBackFilePath = BackgroundFilePath;
            _configService.ConfigInfos.IsDistanceShow = IsDistanceShow;

            _configService.SaveConfigCommand.Execute(null);
            IsAvaibleApply = false;
            BaseApplyAvailableUpdate(IsAvaibleApply);
        }

        public DelegateCommand<string> ChangeBackCommand { get; set; }
        private void ChangeBackExecuted(string type)
        {
            BackgroundFilePath = type + ".png";
        }
        #region Properties
        private string _BackgroundFilePath;
        public string BackgroundFilePath
        {
            get
            {
                return this._BackgroundFilePath;
            }
            set
            {
                SetProperty(ref _BackgroundFilePath, value);
                SetApplySign();
            }
        }

        private bool _IsDistanceShow;

        public bool IsDistanceShow
        {
            get
            {
                return this._IsDistanceShow;
            }
            set
            {
                SetProperty(ref this._IsDistanceShow, value);
                SetApplySign();
            }
        }

        private double _CenterLatitude;

        public double CenterLatitude
        {
            get
            {
                return this._CenterLatitude;
            }
            set
            {
                SetProperty(ref this._CenterLatitude, value);
                SetApplySign();
            }
        }

        private double _CenterLongitude;

        public double CenterLongitude
        {
            get
            {
                return this._CenterLongitude;
            }
            set
            {
                SetProperty(ref this._CenterLongitude, value);
                SetApplySign();
            }
        }
        #endregion
    }
}

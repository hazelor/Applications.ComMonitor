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
            InitConfig();
        }
        private void InitConfig()
        {
            _BackgroundFilePath = _configService.ConfigInfos.MapBackFilePath;
            _IsDistanceShow = _configService.ConfigInfos.IsDistanceShow;
            _CenterLatitude = _configService.ConfigInfos.CenteredLatitude;
            _CenterLongitude = _configService.ConfigInfos.CenteredLongitude;
            _IsGPSShow = _configService.ConfigInfos.IsGPSShow;

            _IsNormal = _configService.ConfigInfos.MapBackFilePath == ConfigItems.NORMAL_BACK;

            _IsSea = _configService.ConfigInfos.CommType == ConfigItems.SEA_BACK;

            _IsMoutain = _configService.ConfigInfos.CommProtocol == ConfigItems.MOUNTAIN_BACK;

        }
        private void ApplyExecuted()
        {
            _configService.ConfigInfos.CenteredLatitude = this.CenterLatitude;
            _configService.ConfigInfos.CenteredLongitude = this.CenterLongitude;
            _configService.ConfigInfos.MapBackFilePath = BackgroundFilePath;
            _configService.ConfigInfos.IsDistanceShow = IsDistanceShow;
            _configService.ConfigInfos.IsGPSShow = IsGPSShow;

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
        private bool _IsGPSShow;

        public bool IsGPSShow
        {
            get
            {
                return this._IsGPSShow;
            }
            set
            {
                SetProperty(ref this._IsGPSShow, value);
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

        private bool _IsNormal;
        public bool IsNormal
        {
            get
            {
                return this._IsNormal;
            }
            set
            {
                SetProperty(ref this._IsNormal, value);
                if (value)
                {
                    this.BackgroundFilePath = ConfigItems.NORMAL_BACK;
                }
                SetApplySign();
            }
        }

        private bool _IsSea;
        public bool IsSea
        {
            get
            {
                return this._IsSea;
            }
            set
            {
                SetProperty(ref this._IsSea, value);
                if (value)
                {
                    this.BackgroundFilePath = ConfigItems.SEA_BACK;
                }
                SetApplySign();
            }
        }

        private bool _IsMoutain;
        public bool IsMoutain
        {
            get
            {
                return this._IsMoutain;
            }
            set
            {
                SetProperty(ref this._IsMoutain, value);
                if (value)
                {
                    this.BackgroundFilePath = ConfigItems.MOUNTAIN_BACK;
                }
                SetApplySign();
            }
        }
        #endregion
    }
}

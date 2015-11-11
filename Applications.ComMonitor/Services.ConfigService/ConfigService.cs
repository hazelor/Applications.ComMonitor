using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Windows.Input;

namespace Services.ConfigService
{
    [Export(typeof(IConfigService))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class ConfigService : IConfigService
    {
        [ImportingConstructor]

        public ConfigService()
        {       
            LoadAdminInfo();
            LoadConfig();
            SaveAdminInfoCommand = new DelegateCommand(SaveAdminInfo);
            SaveConfigCommand = new DelegateCommand(SaveConfig);
        }

        private Serializer _serializer = new Serializer();

        #region AdminLogin
        private AdminInfo _adminInfo;
        public AdminInfo AdminInfos
        {
            get { return this._adminInfo; }
        }
        
        private void LoadAdminInfo()
        {
            if (!System.IO.File.Exists(Properties.Resource.AdminInfoFilePath))
            {
                _adminInfo = new AdminInfo { Name = "admin", Password = MD5Converter.GetMD5("123456") };
                _adminInfo.FilePath = Properties.Resource.AdminInfoFilePath;
            }
            else
            {
                _adminInfo = (AdminInfo)_serializer.DeSerialize(Properties.Resource.AdminInfoFilePath, typeof(AdminInfo));
            }
            SaveAdminInfo();
        }
        private void SaveAdminInfo()
        {
            _serializer.Serialize(_adminInfo, typeof(AdminInfo));
        }

        #endregion

        #region Config

        private ConfigInfo _configInfos;

        public ConfigInfo ConfigInfos
        {
            get
            {
                return this._configInfos;
            }
        }

        public void LoadConfig()
        {
            if (!System.IO.File.Exists(Properties.Resource.ConfigFilePath))
            {
                _configInfos = new ConfigInfo { FilePath = Properties.Resource.ConfigFilePath };
                InitConfigDefault();
            }
            else
            {
                _configInfos = new ConfigInfo{ FilePath =  Properties.Resource.ConfigFilePath};
                _configInfos = (ConfigInfo)_serializer.DeSerialize(Properties.Resource.ConfigFilePath, typeof(ConfigInfo));
            }

            SaveConfig();
           
        }

        private void SaveConfig()
        {
            _serializer.Serialize(_configInfos, typeof(ConfigInfo));
        }

        private void InitConfigDefault()
        {
            //about map
            _configInfos.CenteredLatitude = 39.8029;
            _configInfos.CenteredLongitude = 116.301;
            
            //about link
            _configInfos.UpdateRate = 100;
            //about connectsetting
            _configInfos.CommProtocol = ConfigItems.UDP;
            _configInfos.CommType = ConfigItems.CLIENT;
            _configInfos.CPUType = ConfigItems.LITTLE;
            _configInfos.DownTerminalIP = "192.168.1.123";
            _configInfos.TermialIP = "192.168.1.123";
            _configInfos.DownTerminalPort = 40001;
            _configInfos.TerminalPort = 60000;
            _configInfos.IsDistanceShow = false;
            _configInfos.IsGPSShow = false;
            _configInfos.MapBackFilePath = ConfigItems.NORMAL_BACK;


        }
        #endregion

        #region public
        public ICommand SaveAdminInfoCommand { get; private set; }
        public ICommand SaveConfigCommand { get; private set; }

        public AdminInfo adminInfo
        {
            get
            {
                return this._adminInfo;
            }
        }

        
        #endregion
    }
}

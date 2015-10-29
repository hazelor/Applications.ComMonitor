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

        private ConfigInfo _configInfo;

        public ConfigInfo ConfigInfo
        {
            get
            {
                return this._configInfo;
            }
        }

        public void LoadConfig()
        {
            if (!System.IO.File.Exists(Properties.Resource.AdminInfoFilePath))
            {
                _configInfo = new ConfigInfo { FilePath = Properties.Resource.ConfigFilePath };
            }
            else
            {
                _configInfo.FilePath = Properties.Resource.ConfigFilePath;
                _configInfo = (ConfigInfo)_serializer.DeSerialize(Properties.Resource.ConfigFilePath, typeof(ConfigInfo));
            }

            SaveConfig();
           
        }

        private void SaveConfig()
        {
            _serializer.Serialize(_configInfo, typeof(ConfigInfo));
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

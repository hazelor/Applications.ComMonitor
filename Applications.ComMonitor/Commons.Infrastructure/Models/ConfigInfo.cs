using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Models
{
    public class ConfigInfo : ISerializeModel
    {
        public string FilePath { get; set; }

        #region CommSetting
        public string DownTerminalIP { get; set; } //下位机IP
        public string TermialIP { get; set; }//上位机IP

        public string CommProtocol { get; set; }//通讯协议

        public string CommType { get; set; }//通信类型
        public string CPUType { get; set; }//CPU大小端

        
        #endregion

        #region MapSetting
        public string MapBackFilePath { get; set; }//地图默认背景
        public double CenteredLatitude { get; set; }//初始纬度
        public double CenteredLongtitude { get;set;}//初始经度

        #endregion

        #region TopologySetting

        public int UpdateRate { get; set; }//刷新频率

        #endregion

    }
}

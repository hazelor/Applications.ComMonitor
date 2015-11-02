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
        /// <summary>
        /// 下位机IP
        /// </summary>
        public string DownTerminalIP { get; set; }

        public int DownTerminalPort { get; set; }
        /// <summary>
        /// 上位机IP
        /// </summary>
        public string TermialIP { get; set; }
        public int TerminalPort { get; set; }

        /// <summary>
        /// 通讯协议,tcp,udp
        /// </summary>
        public string CommProtocol { get; set; }

        /// <summary>
        /// 通信类型 server,clinet
        /// </summary>
        public string CommType { get; set; }
        /// <summary>
        /// CPU大小端, big,little
        /// </summary>
        public string CPUType { get; set; }

        
        #endregion

        #region MapSetting
        /// <summary>
        /// 地图默认背景
        /// </summary>
        public string MapBackFilePath { get; set; }
        /// <summary>
        /// 初始纬度
        /// </summary>
        public double CenteredLatitude { get; set; }
        /// <summary>
        /// 初始经度
        /// </summary>
        public double CenteredLongitude { get;set;}

        public bool IsDistanceShow { get; set; }

        #endregion

        #region TopologySetting

        /// <summary>
        /// 刷新频率20~100ms
        /// </summary>
        public int UpdateRate { get; set; }

        #endregion

    }
}

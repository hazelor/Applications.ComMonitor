using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.Prism.Mvvm;
using System.ComponentModel.Composition;
using Modules.ConfigDisplay.Interface;
using Microsoft.Practices.Prism.Commands;
using Commons.Infrastructure.Interface;
using Modules.ConfigDisplay.Tool;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using System.Collections.ObjectModel;
using Commons.Infrastructure;
using System.IO;
using Microsoft.Practices.Prism.PubSubEvents;
using Commons.Infrastructure.Events;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.ConfigurationSetting, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class ConfigurationSettingViewModel : SubConfViewModelBase
    {
        private IProtocolService _protocolService;
        private IConfigService _configService;
        private IEventAggregator _eventAggregator;
        [ImportingConstructor]
        public ConfigurationSettingViewModel(IEventAggregator eventAggregator, IProtocolService protocolService, IConfigService configService)
        {
            _eventAggregator = eventAggregator;
            _protocolService = protocolService;
            _configService = configService;
            ApplyCommand = new DelegateCommand(ApplyExecuted);
            Uri = PanelNames.ConfigurationSettingPanel;
            Name = "参数设置";
            FrecInfos.Add(0);
            FrecInfos.Add(0);
            FrecInfos.Add(0);
            FrecInfos.Add(0);
            _protocolService.RecieveMsgEvent += OnRecieveMsgEvent;
            //InitConfig();
            InitDataStruct();

            ConfSettingCommand = new DelegateCommand(ConfSettingExecuted);
            FreQueryCommand = new DelegateCommand(FreQueryExecuted);
            SaveConfCommand = new DelegateCommand(SaveConfExecuted);
            ConfReadingCommand = new DelegateCommand(ConfReadingExecuted);

            _eventAggregator.GetEvent<ParamUpdatedEvent>().Subscribe(OnParamUpdatedEvent, ThreadOption.UIThread);
            
        }


        private void ApplyExecuted()
        {

        }

        #region Properties
        private string _ParamSettingMsg = "";
        public string ParamSettingMsg
        {
            get
            {
                return this._ParamSettingMsg;
            }
            set
            {
                SetProperty(ref this._ParamSettingMsg, value);
            }
        }
        private ObservableCollection<byte> _FrecInfos = new ObservableCollection<byte>();
        public ObservableCollection<byte> FrecInfos
        {
            get
            {
                return this._FrecInfos;
            }
        }
        public StructShell<STRU_OLSR_PARAME> OLSESettingInfo
        {
            get;
            set;
        }

        public StructShell<STRU_WIFI_PARAME>[] WIFISettingInfos
        { get; set; }

        private const int WIFISettingSize = 4;
        //private Serializer _serializer = new Serializer();
        private void InitDataStruct()
        {
            
            
            _settingInfoConf = new SettingInfoConf();
            //如果没有配置文件存在，填写默认值
            if (!System.IO.File.Exists(Properties.Resources.OLSRParamSettingFilePath))
            {            
                //InitDefault();
            }
            //如果有配置文件存在，反序列化文件
            else
            {
                //DeSerializeStruct();
            }

            //初始化shell
            OLSESettingInfo = new StructShell<STRU_OLSR_PARAME>();
            OLSESettingInfo.Instance = _settingInfoConf.olsrParams;
            OLSESettingInfo.ParseStruct();
            WIFISettingInfos = new StructShell<STRU_WIFI_PARAME>[4];
            for (int i = 0; i < WIFISettingSize; i++)
            {
                WIFISettingInfos[i] = new StructShell<STRU_WIFI_PARAME>();
                WIFISettingInfos[i].Instance = _settingInfoConf.wifiParams[i];
                WIFISettingInfos[i].ParseStruct();
            }

            SaveConfExecuted();
        }
        private void OnParamUpdatedEvent(STRU_TDMOM_PARA_CFG par)
        {
            _settingInfoConf.olsrParams = par.struOlsrParame;
            for (int i = 0; i < WIFISettingSize; i++)
			{
                _settingInfoConf.wifiParams[i] = par.astruWiFiParame[i];
                WIFISettingInfos[i].Instance = _settingInfoConf.wifiParams[i];
			}
            OLSESettingInfo.Instance = _settingInfoConf.olsrParams;

            this.OLSESettingInfo.NotifySubFieldChanged();
            foreach (var info in WIFISettingInfos)
            {
                info.NotifySubFieldChanged();
            }
            //this.OnPropertyChanged("OLSESettingInfo");
            //this.OnPropertyChanged("WIFISettingInfos");
            
        }

        private void InitDefault()
        {
            _settingInfoConf.olsrParams = new STRU_OLSR_PARAME();
            //init default value for olsr
            _settingInfoConf.olsrParams.u16HelloInterval = 3;
            _settingInfoConf.olsrParams.u8NeighbroHoldMultiple = 3;
            _settingInfoConf.olsrParams.U16TCInterval = 3;
            _settingInfoConf.olsrParams.U8TOPHoldMultiple = 3;
            _settingInfoConf.olsrParams.u16MIDInterval = 3;
            _settingInfoConf.olsrParams.u8MIDHoldMultiple = 3;
            _settingInfoConf.olsrParams.u8TCwholeinterval = 3;
            _settingInfoConf.olsrParams.u8TcwholeHoldMultiple = 3;
            _settingInfoConf.olsrParams.u8NodeWillingness = 7;
            _settingInfoConf.olsrParams.ratio_IfSNR = 0;
            _settingInfoConf.olsrParams.ratio_IfUseNum = 0;
            _settingInfoConf.olsrParams.ratio_HopNum = 1;
            _settingInfoConf.olsrParams.ratio_HopSNR = 0;

            _settingInfoConf.wifiParams = new STRU_WIFI_PARAME[WIFISettingSize];
            for (int i = 0; i < WIFISettingSize; i++)
            {
                _settingInfoConf.wifiParams[i] = new STRU_WIFI_PARAME();
                //init default value for wifi
                
                string au8SSID = string.Format("mesh-{0}", i+1);
                byte[] SSIDStr = System.Text.Encoding.ASCII.GetBytes(au8SSID);
                byte[] tmpstr = new byte[32];
                Buffer.BlockCopy(SSIDStr, 0, tmpstr, 0, tmpstr.Length > SSIDStr.Length ? SSIDStr.Length : tmpstr.Length);
                _settingInfoConf.wifiParams[i].au8SSID = new byte[32];
                Buffer.BlockCopy(tmpstr, 0, _settingInfoConf.wifiParams[i].au8SSID, 0, 32);
                _settingInfoConf.wifiParams[i].u8Channel = 1;//"Channel 01: 2.412GHz"
                _settingInfoConf.wifiParams[i].u8ChanWid = 3;//"40MHz"
                _settingInfoConf.wifiParams[i].u8TxPower = 10;
                _settingInfoConf.wifiParams[i].u8EncryptMode = 0;
                _settingInfoConf.wifiParams[i].u8Network = 0;
                _settingInfoConf.wifiParams[i].s32RtsThr = -1;
                _settingInfoConf.wifiParams[i].s32FragThr = -1;

            }


        }
        private SettingInfoConf _settingInfoConf { get; set; }
        internal class SettingInfoConf
        {
            public string FilePath { get; set; }
            
            public STRU_OLSR_PARAME olsrParams;

            
            public STRU_WIFI_PARAME[] wifiParams;

        }
        public DelegateCommand ConfSettingCommand { get; set; }
        public DelegateCommand FreQueryCommand { get; set; }
        public DelegateCommand SaveConfCommand { get; set; }
        public DelegateCommand ConfReadingCommand { get; set; }
        #endregion


        #region Commands
        public void ConfReadingExecuted()
        {
            //--------for test--------
            //
            //STRU_TDMOM_PARA_CFG par = new STRU_TDMOM_PARA_CFG();
            //par.struOlsrParame.nodeName = new byte[4];
            //par.astruWiFiParame = new STRU_WIFI_PARAME[4];
            //for (int i = 0; i < 4; i++)
            //{
            //    par.astruWiFiParame[i].au8SSID = new byte[32];
            //    par.astruWiFiParame[i].au8Key = new byte[32];
            //    par.astruWiFiParame[i].au8Rsv = new byte[3];

            //}
            //OnParamUpdatedEvent(par);
            this._protocolService.ReadParaCtrl();
        }
        public void ConfSettingExecuted()
        {
            OLSESettingInfo.Instance= CheckEndianolsr(OLSESettingInfo.Instance);
            WIFISettingInfos[0].Instance = CheckEndianwifis(WIFISettingInfos[0].Instance);
            byte[] osels = StructConverter.StructToBytes(OLSESettingInfo.Instance);
            byte[] wifis = StructConverter.StructToBytes(WIFISettingInfos[0].Instance);
            byte[] sendbuffer = new byte[osels.Length + wifis.Length * WIFISettingSize];
            int index = 0;
            Buffer.BlockCopy(osels, 0, sendbuffer, index, osels.Length);
            index += osels.Length;
            Buffer.BlockCopy(wifis, 0, sendbuffer, index, wifis.Length);
            index += wifis.Length;
            for (int i = 1; i < WIFISettingSize; i++)
            {
                WIFISettingInfos[i].Instance = CheckEndianwifis(WIFISettingInfos[i].Instance);
                wifis = StructConverter.StructToBytes(WIFISettingInfos[i].Instance);
                Buffer.BlockCopy(wifis, 0, sendbuffer, index, wifis.Length);
                index += wifis.Length;
            }
            ParamSettingMsg = "参数设置发送";
            this._protocolService.ParamSetting(sendbuffer);
        }

        private STRU_OLSR_PARAME CheckEndianolsr(STRU_OLSR_PARAME SOLS)
        {
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                SOLS.u16HelloInterval = Endian.SwapUInt16(SOLS.u16HelloInterval);
                SOLS.U16TCInterval = Endian.SwapUInt16(SOLS.U16TCInterval);
                SOLS.u16MIDInterval = Endian.SwapUInt16(SOLS.u16MIDInterval);
                
                
            }
            return SOLS;
            
        }

        private STRU_WIFI_PARAME CheckEndianwifis(STRU_WIFI_PARAME SWP)
        {
            if (BitConverter.IsLittleEndian != (_configService.ConfigInfos.CPUType == ConfigItems.LITTLE))
            {
                SWP.s32RtsThr = Endian.SwapInt32(SWP.s32RtsThr);
                SWP.s32FragThr = Endian.SwapInt32(SWP.s32FragThr);
                
                
            }
            return SWP;
            
        }

        private void FreQueryExecuted()
        {
            this._protocolService.FreQuery();
        }

        private void SaveConfExecuted()
        {
            SerializeStruct();
        }

        private void OnRecieveMsgEvent(object sender, EventMsgArgs e)
        {
            if (e.MsgID == ConstIDs.O_TDMOM_PARA_CFG)
            {
                ParamSettingMsg = "参数设置成功！";
            }

            if (e.MsgID == ConstIDs.STRU_OMTDM_FREQ_RSP)
            {
                byte[] c = e.Content as byte[];
                if (c == null ||c.Length!=4)
	            {
                    return;
	            }
                for (int i = 0; i < 4; i++)
                {
                    FrecInfos[i] = c[i];
                }
            }
        }
        #endregion
        #region SerializeStruct
        public void SerializeStruct()
        {
            BinaryFormatter formate = new BinaryFormatter();

            FileStream fs = new FileStream(Properties.Resources.OLSRParamSettingFilePath, FileMode.OpenOrCreate);
            formate.Serialize(fs, OLSESettingInfo.Instance);
            fs.Close();

            fs = new FileStream(Properties.Resources.WIFI1ParamSettingFilePath, FileMode.OpenOrCreate);
            formate.Serialize(fs, WIFISettingInfos[0].Instance);
            fs.Close();

            fs = new FileStream(Properties.Resources.WIFI2ParamSettingFilePath, FileMode.OpenOrCreate);
            formate.Serialize(fs, WIFISettingInfos[1].Instance);
            fs.Close();

            fs = new FileStream(Properties.Resources.WIFI3ParamSettingFilePath, FileMode.OpenOrCreate);
            formate.Serialize(fs, WIFISettingInfos[2].Instance);
            fs.Close();

            fs = new FileStream(Properties.Resources.WIFI4ParamSettingFilePath, FileMode.OpenOrCreate);
            formate.Serialize(fs, WIFISettingInfos[3].Instance);
            fs.Close();

        }

        public void DeSerializeStruct()
        {
            BinaryFormatter formate = new BinaryFormatter();

            _settingInfoConf.olsrParams = new STRU_OLSR_PARAME();
            FileStream fs = new FileStream(Properties.Resources.OLSRParamSettingFilePath, FileMode.Open);
            _settingInfoConf.olsrParams = (STRU_OLSR_PARAME)formate.Deserialize(fs);
            fs.Close();

            _settingInfoConf.wifiParams = new STRU_WIFI_PARAME[WIFISettingSize];

            _settingInfoConf.wifiParams[0] = new STRU_WIFI_PARAME();
            fs = new FileStream(Properties.Resources.WIFI1ParamSettingFilePath, FileMode.Open);
            _settingInfoConf.wifiParams[0] = (STRU_WIFI_PARAME)formate.Deserialize(fs);
            fs.Close();

            _settingInfoConf.wifiParams[1] = new STRU_WIFI_PARAME();
            fs = new FileStream(Properties.Resources.WIFI2ParamSettingFilePath, FileMode.Open);
            _settingInfoConf.wifiParams[1] = (STRU_WIFI_PARAME)formate.Deserialize(fs);
            fs.Close();

            _settingInfoConf.wifiParams[2] = new STRU_WIFI_PARAME();
            fs = new FileStream(Properties.Resources.WIFI3ParamSettingFilePath, FileMode.Open);
            _settingInfoConf.wifiParams[2] = (STRU_WIFI_PARAME)formate.Deserialize(fs);
            fs.Close();

            _settingInfoConf.wifiParams[3] = new STRU_WIFI_PARAME();
            fs = new FileStream(Properties.Resources.WIFI4ParamSettingFilePath, FileMode.Open);
            _settingInfoConf.wifiParams[3] = (STRU_WIFI_PARAME)formate.Deserialize(fs);
            fs.Close();

        }
        #endregion
    }
}
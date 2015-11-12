using System.Runtime.InteropServices;
using Commons.Infrastructure;
using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Communications;
using Hazelor.Infrastructure.Communications.Events;
using Hazelor.Infrastructure.Communications.Interface;
using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.Composition;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.Practices.Prism.PubSubEvents;

namespace Services.ProtocolService
{
    [Export(typeof(IProtocolService))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public  partial class ProtocolService : IProtocolService
    {
        private Dictionary<ushort, MethodInfo> ParserDict = new Dictionary<ushort, MethodInfo>();

        private CommNet _CommNet= new CommNet();
        public CommNet CommunicationNet { get { return this._CommNet; } }

        private DownTerminalInfo _downTerminalInfo = new DownTerminalInfo();
        public DownTerminalInfo DTerminalInfo { get { return this._downTerminalInfo; } }

        public event EventHandler<bool> IsStartChannelChangeEvent;

        private bool _IsStartChannel = false;

        public bool IsStartChannel
        {
            get
            {
                return this._IsStartChannel;
            }
            set
            {
                this._IsStartChannel = value;
                IsStartChannelChangeEvent(this, _IsStartChannel);
            }
        }

        PreciseTimer _queryTimer = new PreciseTimer();
        PreciseTimer _sendTimer = new PreciseTimer(20);
        private ushort MsgID;
        private ushort SrcID;
        private ushort DstID;
        private uint DataLen;
        private uint MsgLen;
        #region Service
        private IConfigService _configService;
        private IUdpClientService _udpClientService;
        private ITcpListenerService _tcpListenerService;
        private ITcpClientService _tcpClientService;
        private IEventAggregator _eventAggregator;
        //private DataProcessService _dataProcessService;

        #endregion

        //private bool IsLittle = BitConverter.IsLittleEndian;
        private bool CanStartTimer = false;
        private bool CanQueryRouteAndTopInfo = false;
        private string ChannelServiceType = "";


        private const int COLCOUNT = 19;
        private const int LATLONCOUNT = 4;

        public event EventHandler<NodeChangeEventArg> NodeChangeEvent;
        public event EventHandler<LineChangeEventArg> LineChangeEvent;
        [ImportingConstructor]
        public ProtocolService(IConfigService configService, IEventAggregator eventAggregator)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            //_dataProcessService = dataProcessService;
            //_queryTimer.Elapsed = OnQueryTimmer;
            //初始化net
            _CommNet.NodeNum = 0;
            _CommNet.CommLines = new ObservableCollection<CommLine>();
            _CommNet.CommNodes = new ObservableCollection<CommNode>();
            _CommNet.UserDevs = new ObservableCollection<UserDev>();
            DTerminalInfo.RouteInfo = new ObservableCollection<RouteInfo>();

            
            //获取基础数据收发服务的实例
            _tcpClientService = new TcpClientService(_configService.ConfigInfos.TerminalPort);
            _udpClientService = new UdpClientService(_configService.ConfigInfos.DownTerminalIP,
                _configService.ConfigInfos.DownTerminalPort,
                _configService.ConfigInfos.TermialIP,
                _configService.ConfigInfos.TerminalPort);
            _tcpListenerService = new TcpListenerService(_configService.ConfigInfos.TerminalPort);
            //获取该类下面对应的处理方法的反射，用以与ID对应并方便扩展调用，如需新的处理方法可定义一个method并辅以ParserAttribute
            var info  = typeof(ProtocolService);
            foreach (var item in info.GetMethods(BindingFlags.NonPublic|BindingFlags.Instance))
            {
                ParserAttribute ma= null;
                try
                {
                     ma = (ParserAttribute)Attribute.GetCustomAttribute(item, typeof(ParserAttribute));
                }
                catch (ArgumentNullException)
                {

                    continue;
                }
                finally
                {
                    if (ma != null)
                    {
                        ParserDict.Add(ma.ParseID, item);
                    }
                    
                } 
                
            }

            //register event
            _eventAggregator.GetEvent<ConfigUpdateEvent>().Subscribe(OnConfigUpdated);
            _eventAggregator.GetEvent<RecievedEvent>().Subscribe(ParserDatas, ThreadOption.UIThread);

        }

       
        private void OnConfigUpdated(bool sign)
        {
            if (IsStartChannel)
            {
                StopChannel();
                //SLEEP FOR DISCONNECT
                //System.Threading.Thread.Sleep(30000);
                StartChannel();
            }
            
        }
        /// <summary>
        /// 开始定时数据发送
        /// </summary>
        public void StartChannel()
        {
            //设置定时器的时间间隔
            _queryTimer.Interval = _configService.ConfigInfos.UpdateRate;
            InitializeChannel();
            if (CanStartTimer)
            {
                _queryTimer.Start();
                _sendTimer.Start();
                
            }
            IsStartChannel = true;
        }
        /// <summary>
        /// 结束数据定时发送
        /// </summary>
        public void StopChannel()
        {
            _sendTimer.Stop();
            _queryTimer.Stop();
            ResetChannel();
            IsStartChannel = false;
        }

        ///// <summary>
        ///// 通过TcpClient向下位机发送数据
        ///// </summary>
        ///// <param name="sender"></param>
        ///// <param name="e"></param>
        //private void QueryByTcpClient(object sender, EventArgs e)
        //{
        //    if (CanQueryRouteAndTopInfo)
        //    {
        //        _tcpClientService.SendData(QueryRouteInfo());
        //        _tcpClientService.SendData(QueryTopInfo());
        //    }
        //    else
        //    {
        //        _tcpClientService.SendData(SendIpInfo());
        //    }
        //}

        ///// <summary>
        ///// 通过TcpListener向下位机发送数据
        ///// </summary>
        ///// <param name="sender"></param>
        ///// <param name="e"></param>
        //private void QueryByTcpListener(object sender, EventArgs e)
        //{
        //    if (CanQueryRouteAndTopInfo)
        //    {
        //        _tcpListenerService.SendDataToALL(QueryRouteInfo());
        //        _tcpListenerService.SendDataToALL(QueryTopInfo());
        //    }
        //    else
        //    {
        //        _tcpListenerService.SendDataToALL(SendIpInfo());
        //    }
        //}

        /// <summary>
        /// 通过UdpClient向下位机发送数据
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnQueryTimer(object sender, EventArgs e)
        {
            if (CanQueryRouteAndTopInfo)
            {
                AddSendData(QueryRouteInfo());
                AddSendData(QueryTopInfo());
            }
            else
            {
                CanQueryRouteAndTopInfo = true;
                AddSendData(SendIpInfo());
            }
        }

        private Queue<byte[]> _sendBuffer = new Queue<byte[]>();
        private void OnSendTimer(object sender, EventArgs e)
        {
            
            if (_sendBuffer.Count == 0)
	        {
		        return;
	        }
            else{
                byte[] b = _sendBuffer.Dequeue();
                this.SendData(b);
            }
            
        }
        private void AddSendData(byte[] addsb)
        {
            this._sendBuffer.Enqueue(addsb);
        }
        private void SendData(byte[] sendBuffer)
        {
            if (_configService.ConfigInfos.CommProtocol == ConfigItems.UDP)
            {
                _udpClientService.SendData(sendBuffer);
                return;
            }

            if (_configService.ConfigInfos.CommProtocol == ConfigItems.TCP)
            {
                if (_configService.ConfigInfos.CommType == ConfigItems.CLIENT)
                {
                    _tcpClientService.SendData(sendBuffer);
                    return;
                }
                if (_configService.ConfigInfos.CommType == ConfigItems.SERVER)
                {
                    _tcpListenerService.SendDataToALL(sendBuffer);
                    return;
                }

            }
        }
        //private void OnQueryTimmer(object sender, EventArgs e)
        //{
        //    //_queryTimmer.Stop();
        //    //send some package for querying
        //    QueryRouteInfo();
        //    QueryRouteInfo();
        //    //_queryTimmer.Start();
        //}

        /// <summary>
        /// 初始化基础数据收发服务
        /// </summary>
        private void InitializeChannel()
        {
            _sendTimer.Elapsed += OnSendTimer;
            _queryTimer.Elapsed += OnQueryTimer;
            if (_configService.ConfigInfos.CommProtocol == ConfigItems.TCP)
            {
                if (_configService.ConfigInfos.CommType == ConfigItems.CLIENT)
                {
                    ChannelServiceType = "TcpClient";
                    _tcpClientService.InitializeConfiguration(_configService.ConfigInfos.TerminalPort);
                    _tcpClientService.Register(OnTcpDiagramReceived);
                    _tcpClientService.ErrorHappenedEvent += OnChannelErrorHappened;
                    
                    CanStartTimer = _tcpClientService.Connect(_configService.ConfigInfos.DownTerminalIP, _configService.ConfigInfos.DownTerminalPort);
                }
                if (_configService.ConfigInfos.CommType == ConfigItems.SERVER)
                {
                    ChannelServiceType = "TcpListener";
                    _tcpListenerService.InitializeConfiguration(_configService.ConfigInfos.TerminalPort);
                    _tcpListenerService.Register(OnTcpDiagramReceived);
                    
                    _tcpListenerService.ErrorHappenedEvent += OnChannelErrorHappened;
                    _tcpListenerService.StartService();
                    CanStartTimer = true;
                }
            }
            if (_configService.ConfigInfos.CommProtocol == ConfigItems.UDP)
            {
                ChannelServiceType = "UdpClient";
                _udpClientService.InitializeConfiguration(_configService.ConfigInfos.DownTerminalIP,
            _configService.ConfigInfos.DownTerminalPort, _configService.ConfigInfos.TerminalPort);
                _udpClientService.Register(OnUdpDiagramReceived);
                _udpClientService.ErrorHappenedEvent += OnChannelErrorHappened;
                
                _udpClientService.StartService();
                CanStartTimer = true;
                //if (_configService.ConfigInfos.CommType == ConfigItems.CLIENT)
                //{
                   
                //}
                //if (_configService.ConfigInfos.CommType == ConfigItems.SERVER)
                //{
                //}
            }
        }

        /// <summary>
        /// 重置基础数据收发服务
        /// </summary>
        private void ResetChannel()
        {
            if (ChannelServiceType == "TcpClient")
            {
                CanStartTimer = false;
                CanQueryRouteAndTopInfo = false;
                _tcpClientService.Unregister(OnTcpDiagramReceived);
                _tcpClientService.ErrorHappenedEvent -= OnChannelErrorHappened;
                _tcpClientService.Disconnect();
                return;
            }
            if (ChannelServiceType == "UdpClient")
            {
                CanStartTimer = false;
                CanQueryRouteAndTopInfo = false;
                _udpClientService.Unregister(OnUdpDiagramReceived);
                _udpClientService.ErrorHappenedEvent -= OnChannelErrorHappened;
                _udpClientService.StopService();
                return;
            }
            if (ChannelServiceType == "TcpListener")
            {
                CanStartTimer = false;
                CanQueryRouteAndTopInfo = false;
                _tcpListenerService.Unregister(OnTcpDiagramReceived);
                _tcpListenerService.ErrorHappenedEvent -= OnChannelErrorHappened;
                _tcpListenerService.StopService();
                return;
            }
            if (ChannelServiceType == "UdpListener")
            {
                return;
            }
        }

        private void OnChannelErrorHappened(object sender, EventArgs e)
        {
            
            StopChannel();
        }

        /// <summary>
        /// Tcp类型下接收到报文之后的处理函数
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e">e中包含收到的数据通过e.datagram来获取数据类型为byte[]的报文</param>
        private void OnTcpDiagramReceived(object sender, TcpDatagramReceivedEventArgs<byte[]> e)
        {
            byte[] srcBuffer = e.datagram;
            //string str = System.Text.Encoding.Default.GetString(content);
            ParserDatas(srcBuffer);
            //Encoding encoding = Encoding.UTF8;
            //string contentstring = encoding.GetString(content, 0, content.Length);
            //this.receivetext = str;
            //byte[] sendbackdata = new byte[] { 0xeb, 0x90 };
        }

        /// <summary>
        /// Udp类型下接收到报文之后的处理函数
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e">e中包含收到的数据通过e.Content来获取数据类型为byte[]的报文</param>
        private void OnUdpDiagramReceived(object sender, DataReceivedEventArgs e)
        {
            byte[] srcBuffer = e.Content;
            //string str = System.Text.Encoding.Default.GetString(content);
            _eventAggregator.GetEvent<RecievedEvent>().Publish(srcBuffer);
            //ParserDatas(srcBuffer);
            //Encoding encoding = Encoding.UTF8;
            //string contentstring = encoding.GetString(content, 0, content.Length);
            //this.receivetext = str;
            //byte[] sendbackdata = new byte[] { 0xeb, 0x90 };
        }
    }
}

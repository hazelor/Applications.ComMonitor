using System.Runtime.InteropServices;
using System.Timers;
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
using System.Xml.Linq;
using Commons.Infrastructure.Attributes;

namespace Services.ProtocolService
{
    [Export(typeof(IProtocolService))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public  partial class ProtocolService : IProtocolService
    {
        #region TerminalMac
        private MacAddr _TerminalMac;
        public MacAddr TerminalMac
        {
            get
            {
                return this._TerminalMac;
            }
        }
        #endregion
        private Dictionary<ushort, MethodInfo> ParserDict = new Dictionary<ushort, MethodInfo>();

        private CommNet _CommNet = new CommNet();

        private int _TopSendCount = 0;
        private const int MAX_TOPSEND_COUNT = 5000;

        public CommNet CommunicationNet
        {
            get
            {
                return this._CommNet;
            }
        }

        public CommLine FindLine(MacAddr startNodeMac, MacAddr endNodeMac)
        {
            foreach (var line in _CommNet.CommLines)
            {
                if (line.StartNode.MacAddr.Equals(startNodeMac) && line.EndNode.MacAddr.Equals(endNodeMac))
                {
                    return line;
                }
            }
            return null;
        }
        public string GetName(MacAddr mac)
        {
            foreach (var node in _CommNet.CommNodes)
            {
                if (node.MacAddr.Equals(mac))
                {
                    return node.NodeName;
                }
            }
            return "";
        }

        private DownTerminalInfo _downTerminalInfo = new DownTerminalInfo();

        public DownTerminalInfo DTerminalInfo
        {
            get
            {
                return this._downTerminalInfo;
            }
        }

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

        //PreciseTimer _queryTimer = new PreciseTimer();
        //PreciseTimer _sendTimer = new PreciseTimer(20);
        Timer _queryTimer = new Timer(); 
        //Timer _sendTimer = new Timer(100);
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
        private System.Timers.Timer _mainProgressTimer;
        //private DataProcessService _dataProcessService;

        #endregion
        
        //private bool IsLittle = BitConverter.IsLittleEndian;
        private bool CanStartTimer = false;
        private bool CanQueryRouteAndTopInfo = false;
        private string ChannelServiceType = "";
        
        private const int COLCOUNT = 23;
        private const int LATLONCOUNT = 4;
        
        public event EventHandler<NodeChangeEventArg> NodeChangeEvent;
        public event EventHandler<LineChangeEventArg> LineChangeEvent;
        //public event EventHandler IPSettingSuccessMsgReceiveEvent;
        
        [ImportingConstructor]
        public ProtocolService(IConfigService configService, IEventAggregator eventAggregator)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            //_dataProcessService = dataProcessService;
            //_queryTimer.Elapsed = OnQueryTimmer;
            _queryTimer.Elapsed += OnQueryTimer;
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
            var info = typeof(ProtocolService);
            foreach (var item in info.GetMethods(BindingFlags.NonPublic | BindingFlags.Instance))
            {
                ParserAttribute ma = null;
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
            //Parse conf for nodeImage
            LoadNodeImagesConf();
            
            //register event
            _eventAggregator.GetEvent<ConfigUpdateEvent>().Subscribe(OnConfigUpdated);
            _eventAggregator.GetEvent<RecievedEvent>().Subscribe(ParserDatas, ThreadOption.UIThread);

            _mainProgressTimer = new System.Timers.Timer(1000);
            _mainProgressTimer.Elapsed += OnMainProgressTimer;
            _mainProgressTimer.Start();
        }
        private void OnMainProgressTimer(object sender, EventArgs e)
        {
            if (!_udpClientService.isStarted)
            {
                StartChannel();
            }

        }
        Dictionary<int, string> _NodeImageDict = new Dictionary<int, string>();
        
        private void LoadNodeImagesConf()
        {
            try
            {
                XDocument doc = XDocument.Load("./conf/NodeImagesConf.xml");
                XElement root = doc.Element("NodeImages");
                foreach (var item in root.Elements("Item"))
                {
                    _NodeImageDict[int.Parse(item.Attribute("type").Value)] = string.Format(@".\images\{0}", item.Attribute("Name").Value);
                }
            }
            catch (Exception)
            {
            }
        }
        
        private void OnConfigUpdated(bool sign)
        {
            if (IsStartChannel)
            {
                StopChannel();
                //SLEEP FOR DISCONNECT
                //System.Threading.Thread.Sleep(3000);
                StartChannel();
            }
        }
        
        /// <summary>
        /// 开始定时数据发送
        /// </summary>
        public void StartChannel()
        {
            //设置定时器的时间间隔
            //_recordNodeGPS.Clear();
            _queryTimer.Interval = _configService.ConfigInfos.UpdateRate;
            //_sendTimer.Interval = _configService.ConfigInfos.UpdateRate;
            InitializeChannel();

            _TerminalMac = MacAddr.GetTerminalMac(_configService.ConfigInfos.DownTerminalIP, _configService.ConfigInfos.TermialIP);
            if (CanStartTimer)
            {
                _queryTimer.Start();
                //_sendTimer.Start();
            }
            IsStartChannel = true;
        }
        
        /// <summary>
        /// 结束数据定时发送
        /// </summary>
        public void StopChannel()
        {
            //_sendTimer.Stop();
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
        private bool isClear = true;
        private bool isReadPara = false;
        private bool isQueryFreq = false;
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
                if (!isReadPara)
                { 
                    ReadParaCtrl();
                    
                }
                if (!isQueryFreq)
                {
                    FreQuery();
                }
                if (MacAddr.SelfMacAddr == null)
                {
                    AddSendData(SendIpInfo());
                }

                //发送计数，如果超过阈值将清空top信息
                _TopSendCount++;
                if (_TopSendCount > (MAX_TOPSEND_COUNT/_configService.ConfigInfos.UpdateRate) && isClear)
                {
                    isClear = false;
                    _TopSendCount = 0;
                    ClearAll();
                    //BeginUpdateNode();
                    //BeginUpdateLine();
                    //EndUpdateLine();
                    //EndUpdateNode();
                }
            }
            else
            {
                CanQueryRouteAndTopInfo = true;
                if (IPSettingSuccessMsgReceiveEvent!=null)
                {
                    IPSettingSuccessMsgReceiveEvent(this, new EventArgs());
                }
                
                AddSendData(SendIpInfo());
            }
        }
        private void ClearAll()
        {
            this._eventAggregator.GetEvent<ClearAllEvent>().Publish(true);
            //this._CommNet.CommLines.Clear();
            //this._CommNet.CommNodes.Clear();

            
        }

        private Queue<byte[]> _sendBuffer = new Queue<byte[]>();
        
        private void OnSendTimer(object sender, EventArgs e)
        {
            if (_sendBuffer.Count == 0)
            {
                return;
            }
            else
            {
                byte[] b = _sendBuffer.Dequeue();
                this.SendData(b);
            }
        }
        private object locker = new object();
        private void AddSendData(byte[] addsb)
        {
            lock(locker)
            {
                this.SendData(addsb);
            }
            
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
        
       
        
        /// <summary>
        /// 初始化基础数据收发服务
        /// </summary>
        private void InitializeChannel()
        {
            //_sendTimer.Elapsed += OnSendTimer;
            
            if (_configService.ConfigInfos.CommProtocol == ConfigItems.TCP)
            {
                if (_configService.ConfigInfos.CommType == ConfigItems.CLIENT)
                {
                    //实例化Tcp数据接受缓存
                    DataLink = new LinkedList<byte[]>();
                    //用于组包的缓冲区
                    DataBuffer = new BufferBytes();
                    //设置组包线程标志位
                    IsStopReceive = false;
                    //实例化组包线程
                    ReceivedDataProcessThread = new System.Threading.Thread(ConstrcutPackage);
                    ReceivedDataProcessThread.IsBackground = true;
                    ReceivedDataProcessThread.Start();
                    //配置TcpClient
                    ChannelServiceType = "TcpClient";
                    _tcpClientService.InitializeConfiguration(_configService.ConfigInfos.TerminalPort);
                    _tcpClientService.Register(OnTcpDiagramReceived);
                    _tcpClientService.ErrorHappenedEvent += OnChannelErrorHappened;
                    //连接
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
                IsStopReceive = true;
                IsStartChannel = false;
                _tcpClientService.Disconnect();
                if (ReceivedDataProcessThread != null && ReceivedDataProcessThread.IsAlive)
                {
                    ReceivedDataProcessThread.Abort();
                    ReceivedDataProcessThread = null;
                }
                if (DataLink != null)
                {
                    DataLink.Clear();
                    DataLink = null;
                }

                DataBuffer = null;
                return;
            }
            if (ChannelServiceType == "UdpClient")
            {
                CanStartTimer = false;
                CanQueryRouteAndTopInfo = false;
                _udpClientService.Unregister(OnUdpDiagramReceived);
                _udpClientService.ErrorHappenedEvent -= OnChannelErrorHappened;
                _udpClientService.StopService();
                IsStartChannel = false;
                return;
            }
            if (ChannelServiceType == "TcpListener")
            {
                CanStartTimer = false;
                CanQueryRouteAndTopInfo = false;
                _tcpListenerService.Unregister(OnTcpDiagramReceived);
                _tcpListenerService.ErrorHappenedEvent -= OnChannelErrorHappened;
                _tcpListenerService.StopService();
                IsStartChannel = false;
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
            if (e.datagram.Length > 0)
            {
                LinkedListNode<byte[]> tmpNode = new LinkedListNode<byte[]>(e.datagram);
                if (DataLink != null)
                {
                    DataLink.AddLast(tmpNode);
                }
            }
      
        }
        
        /// <summary>
        /// Udp类型下接收到报文之后的处理函数
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e">e中包含收到的数据通过e.Content来获取数据类型为byte[]的报文</param>
        private void OnUdpDiagramReceived(object sender, DataReceivedEventArgs e)
        {
            if (e.Content.Length >= 20)
            {

                _eventAggregator.GetEvent<RecievedEvent>().Publish(e.Content);
            }
        
        }
    }
}
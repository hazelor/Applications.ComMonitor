using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Modules.InfosDisplay.Event;
using Modules.InfosDisplay.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.InfosDisplay
{
    [Export]
    public class InfosPanelViewModel : BindableBase
    {
        IProtocolService _protocolService;
        IEventAggregator _eventAggregator;
        [ImportingConstructor]
        public  InfosPanelViewModel(IProtocolService protocolService, IEventAggregator eventAggregator)
        {
            _protocolService = protocolService;
            _eventAggregator = eventAggregator;
            _protocolService.LineChangeEvent += OnLineChanged;
            _protocolService.NodeChangeEvent += OnNodeChanged;

            _protocolService.DTerminalInfo.OnRoutInfoChanged += OnRoutInfoChanged;

            _eventAggregator.GetEvent<SelNodeEvent>().Subscribe(NodeSelectChanged);
            _eventAggregator.GetEvent<SelLineEvent>().Subscribe(LineSelectedChanged);
        }

        public event EventHandler<NodeChangeEventArg> NodeChangedEvent;
        public event EventHandler<LineChangeEventArg> LineChangedEvent;

        public event EventHandler SelectedNodeEvent;
        public event EventHandler SelectedLineEvent;
        private void OnNodeChanged(object sender, NodeChangeEventArg e)
        {
            SelectedNodeEvent(this, null);
            NodeChangedEvent(this, e);
        }

        private void OnLineChanged(object sender, LineChangeEventArg e)
        {
            SelectedLineEvent(this,null);
            LineChangedEvent(this, e);
        }

        private void OnRoutInfoChanged(object sender, EventArgs e)
        {
            string nodeName = "";
            nodeName = _protocolService.GetName(MacAddr.SelfMacAddr);
            bool IsReInit = false;
            if (RoutInfoDecs.Count == 0)
            {
                IsReInit = true;
            }
            int i = 0;
            for (i = 0; i < Math.Min(RoutInfoDecs.Count,TerminalInfo.numRouteInfo); i++)
            {
                RoutInfoDecs[i].info = TerminalInfo.RouteInfo[i];
                RoutInfoDecs[i].GetNames(this._protocolService);
                
                RoutInfoDecs[i].RoutName = string.Format("{0}-->{1}",nodeName, RoutInfoDecs[i].DstName);

            }
            for (; i< RoutInfoDecs.Count; i++)
			{
                RoutInfoDecs.RemoveAt(i);
                i--;
			}
            for(;i<TerminalInfo.numRouteInfo;i++)
            {
                RoutInfoDecorator rd = new RoutInfoDecorator { info = TerminalInfo.RouteInfo[i] };
                rd.GetNames(this._protocolService);
                rd.RoutName = string.Format("{0}-->{1}",nodeName, rd.DstName);
                RoutInfoDecs.Add(rd);
            }

            if (IsReInit && RoutInfoDecs.Count>0)
            {
                this.SelRoutInfo = RoutInfoDecs[0];
            }

            ShowRouteLines();
            //if (RoutInfoDecs.Count == 0)
            //{
            //    int index = 0;
            //    foreach (var info in TerminalInfo.RouteInfo)
            //    {
            //        index++;
            //        RoutInfoDecs.Add(new RoutInfoDecorator { RoutName = string.Format("路由信息{0}", index), info = info });
            //    }
            //}
            //else
            //{
            //    for (int i = 0; i < 10; i++)
            //    {
            //        RoutInfoDecs[i].info = TerminalInfo.RouteInfo[i];
            //    }
            //}
            
        }

        private ObservableCollection<RoutInfoDecorator> _routInfoDecs = new ObservableCollection<RoutInfoDecorator>();

        public ObservableCollection<RoutInfoDecorator> RoutInfoDecs
        {
            get {
                return this._routInfoDecs;

            }
            
        }

        private RoutInfoDecorator _SelRoutInfo;
        public RoutInfoDecorator SelRoutInfo
        {
            get
            {
                return this._SelRoutInfo;
            }
            set
            {
                SetProperty(ref this._SelRoutInfo, value);
                ShowRouteLines();
            }
        }

        public ObservableCollection<CommLine> LineInfoOfNode
        {
            get
            {
                return this.SelectedNode.LineInfoOfNode;
            }
        }
        private void NodeSelectChanged(CommNode cn)
        {
            this.SelectedNode = cn;
            foreach (var node in this._protocolService.CommunicationNet.CommNodes)
            {
                if (node.MacAddr.Equals(cn.MacAddr))
                {
                    node.IsSelected = true;
                }
                else
                {
                    node.IsSelected = false;
                }
            }
        }

        private void LineSelectedChanged(CommLine cl)
        {
            this.SelectedLine = cl;
        }
        #region public properties

        private bool _IsSelf = true;
        public bool IsSelf
        {
            get
            {
                return this._IsSelf;
            }
            set
            {
                SetProperty(ref this._IsSelf, value);
            }
        }
        public DownTerminalInfo TerminalInfo
        {
            get
            {
                return _protocolService.DTerminalInfo;
            }
        }

        private CommNode _SelectedNode = null;
        public CommNode SelectedNode
        {
            get{
                return this._SelectedNode;
            }
            set
            {
                SetProperty(ref this._SelectedNode, value);
                this.OnPropertyChanged("LineInfoOfNode");
            }
        }

        private CommLine _SelectedLine = null;
        public CommLine SelectedLine
        {
            get
            {
                return this._SelectedLine;
            }
            set
            {
                SetProperty(ref this._SelectedLine, value);
            }
        }
        #endregion

        #region LineShowStyle
        private bool _IsAllShow = true;
        public bool IsAllShow
        {
            get
            {
                return this._IsAllShow;
            }
            set
            {
                SetProperty(ref this._IsAllShow, value);

                if (_IsAllShow)
                {
                    foreach (var line in _protocolService.CommunicationNet.CommLines)
                    {
                        line.IsPreShow = true;
                        line.IsBacShow = true;
                    }
                }
                else
                {
                    ShowRouteLines();
                }
            }
        }

        public void ShowRouteLines()
        {
            
            if (!_IsAllShow && _SelRoutInfo != null)
            {
                List<MacAddr> tmpMacList = new List<MacAddr>();
                tmpMacList.Add(MacAddr.SelfMacAddr);
                //显示初始mac
                if (_SelRoutInfo.info.NextAddr.Length < 240)
                {
                    return;
                }
                byte[] tmp = new byte[6];
                for (int i = 0; i < (_SelRoutInfo.info.Dist < 30 ? _SelRoutInfo.info.Dist : 30); i++)
                {
                    Buffer.BlockCopy(_SelRoutInfo.info.NextAddr, i * 8, tmp, 0, 6);
                    tmpMacList.Add(new MacAddr(tmp));

                }

                CommLine cl;
                foreach (var line in _protocolService.CommunicationNet.CommLines)
                {
                    line.IsPreShow = true;
                    line.IsBacShow = true;
                }
                for (int i = 0; i < tmpMacList.Count - 1; i++)
                {
                    cl = _protocolService.FindLine(tmpMacList[i], tmpMacList[i + 1]);
                    if (cl!= null)
                    {
                        cl.IsPreShow = false;
                    }
                    else
                    {
                        cl = _protocolService.FindLine(tmpMacList[i+1], tmpMacList[i]);
                        if (cl != null)
                        {
                            cl.IsBacShow = false;
                        }
                    }
                    
                }
            }
        }
        #endregion

    }
}

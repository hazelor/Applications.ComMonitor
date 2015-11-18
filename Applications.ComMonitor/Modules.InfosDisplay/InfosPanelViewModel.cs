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
        private void OnNodeChanged(object sender, NodeChangeEventArg e)
        {
            NodeChangedEvent(this, e);
        }

        private void OnLineChanged(object sender, LineChangeEventArg e)
        {
            LineChangedEvent(this, e);
        }

        private void OnRoutInfoChanged(object sender, EventArgs e)
        {
            int i = 0;
            for (i = 0; i < Math.Min(RoutInfoDecs.Count,TerminalInfo.numRouteInfo); i++)
            {
                RoutInfoDecs[i].info = TerminalInfo.RouteInfo[i];

            }
            for (; i< RoutInfoDecs.Count; i++)
			{
                RoutInfoDecs.RemoveAt(i);
                i--;
			}
            for(;i<TerminalInfo.numRouteInfo;i++)
            {
                RoutInfoDecs.Add(new RoutInfoDecorator { RoutName = string.Format("路由信息{0}", i), info = TerminalInfo.RouteInfo[i] });
            }
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
        private void NodeSelectChanged(CommNode cn)
        {
            this.SelectedNode = cn;
        }

        private void LineSelectedChanged(CommLine cl)
        {
            this.SelectedLine = cl;
        }
        #region public properties
        public DownTerminalInfo TerminalInfo
        {
            get
            {
                return _protocolService.DTerminalInfo;
            }
        }

        private CommNode _SelectedNode;
        public CommNode SelectedNode
        {
            get{
                return this._SelectedNode;
            }
            set
            {
                SetProperty(ref this._SelectedNode, value);
            }
        }

        private CommLine _SelectedLine;
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



    }
}

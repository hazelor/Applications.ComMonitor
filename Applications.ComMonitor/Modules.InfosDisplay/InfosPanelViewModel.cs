using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Modules.InfosDisplay.Event;
using System;
using System.Collections.Generic;
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

            _eventAggregator.GetEvent<SelNodeEvent>().Subscribe(SelectChanged);

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

        private string GetTerminalInfo()
        {
            string res = "";
            res = _protocolService.DTerminalInfo.ToString();
            return res;
        }

        private void SelectChanged(CommNode cn)
        {
            this.SelectedNode = cn;
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
        #endregion



    }
}

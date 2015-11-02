using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.PubSubEvents;
using Modules.InfosDisplay.Event;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Modules.InfosDisplay.Nodes
{
    public class NodeBase : UserControl
    {
        [Import]
        private IEventAggregator _eventAggregator;
        protected override void OnMouseDoubleClick(System.Windows.Input.MouseButtonEventArgs e)
        {
            CommNode cn = this.DataContext as CommNode;
            _eventAggregator.GetEvent<SelNodeEvent>().Publish(cn);
            base.OnMouseDoubleClick(e);

        }
    }
}

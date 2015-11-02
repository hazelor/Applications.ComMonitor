using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.InfosDisplay.controller
{
    [Export(typeof(INodeController))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class NodeController : INodeController
    {
        public DelegateCommand AddNodeCommand { get; private set; }
        
        [ImportingConstructor]
        public NodeController()
        {

        }

        private void AddNodeExecuted()
        {

        }
    }
}

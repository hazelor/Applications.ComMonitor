using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.InfosDisplay.controller
{
    public interface INodeController
    {
        DelegateCommand AddNodeCommand { get; }
    }
}

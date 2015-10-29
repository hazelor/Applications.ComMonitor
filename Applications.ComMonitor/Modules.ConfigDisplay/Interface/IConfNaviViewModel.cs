using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Modules.ConfigDisplay.Interface
{
    public interface IConfNaviViewModel
    {
        ICommand NavigatorCommand { get; set; }
        string Uri { get; set; }
        string Name { get; set; }
    }
}

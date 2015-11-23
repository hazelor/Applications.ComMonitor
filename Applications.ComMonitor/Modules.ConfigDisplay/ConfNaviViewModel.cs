using Commons.Infrastructure;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Regions;
using Microsoft.Practices.ServiceLocation;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Modules.ConfigDisplay
{
    [Export(typeof(IConfNaviViewModel))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    class ConfNaviViewModel : IConfNaviViewModel
    {
        [ImportingConstructor]
        public ConfNaviViewModel()
        {
            NavigatorCommand = new DelegateCommand(NavigateExecuted);
        }

        [Import]
        private IRegionManager regionManager;
        public ICommand NavigatorCommand { get; set; }
        public string Uri { get; set; }

        public string Name { get; set; }

        public bool IsNaviChecked { get; set; }
        private void NavigateExecuted()
        {
            regionManager.RequestNavigate(RegionNames.ConfContentRegion, new Uri(Uri, UriKind.Relative));
        }
    }
}

using Commons.Infrastructure;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Regions;
using Microsoft.Practices.ServiceLocation;
using Modules.ConfigDisplay.Command;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay.Controller
{
    [Export(typeof(IConfController))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class ConfController : IConfController
    {
        private IRegionManager _regionManager;
        private readonly ConfCommandProxy _commandProxy;

        [ImportingConstructor]
        public ConfController(IRegionManager regionManager, ConfCommandProxy commandProxy)
        {
            _regionManager = regionManager;
            _commandProxy = commandProxy;
           
        }

        private bool _IsAviableApply = false;
        public bool IsAviableApply
        {
            get
            {
                return this._IsAviableApply;
            }
            set
            {
                _IsAviableApply = value;
            }
        }

        public event EventHandler<EventArgs> IsAvailableApplyHandler;

        private List<IConfViewModel> subConfViewModelList = new List<IConfViewModel>();
        public void AddSubConfPanel(IConfViewModel subPanelViewModel)
        {
            subConfViewModelList.Add(subPanelViewModel);
            IRegion naviRegion = _regionManager.Regions[RegionNames.ConfNavigatorRegion];
            IConfNaviViewModel vm = ServiceLocator.Current.GetInstance<IConfNaviViewModel>();
            vm.Uri = subPanelViewModel.Uri;
            vm.Name = subPanelViewModel.Name;
            naviRegion.Add(vm);

            _commandProxy.ApplyConfCommand.RegisterCommand(subPanelViewModel.ApplyCommand);
            subPanelViewModel.UpdateAviableApplyHandler += OnIsAviableApplyChanged;
        }

        
        private void OnIsAviableApplyChanged(object sender, bool e)
        {
            bool res = false;
            foreach (var vm in subConfViewModelList)
            {
                res = res | vm.IsAvaibleApply;
            }
            IsAviableApply = res;

            IsAvailableApplyHandler(this,null);
            
        }
    }
}

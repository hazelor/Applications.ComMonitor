using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay
{
    public class SubConfViewModelBase : BindableBase, IConfViewModel
    {
        public DelegateCommand ApplyCommand { get; set; }

        public string Uri { get; set; }

        public string Name { get; set; }

        public event EventHandler<bool> UpdateAviableApplyHandler;

        public bool IsAvaibleApply { get; set; }

        protected IConfigService _configService;
    }
}

using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.Mvvm;
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
        [ImportingConstructor]
        public  InfosPanelViewModel(IProtocolService protocolService)
        {
            _protocolService = protocolService;

        }
    }
}

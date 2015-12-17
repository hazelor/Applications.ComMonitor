using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Interface
{
    public interface IConfViewModel
    {
        DelegateCommand ApplyCommand { get; set; }

        string Uri { get; set; }

        string Name { get; set; }

        event EventHandler<bool> UpdateAviableApplyHandler;

        bool IsAvaibleApply { get; set; }

    }
}

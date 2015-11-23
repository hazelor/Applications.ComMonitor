using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;

namespace Commons.Infrastructure.Interface
{
    public interface IConfigService
    {

        ICommand SaveAdminInfoCommand { get;  }

        ICommand SaveConfigCommand { get; }
        AdminInfo AdminInfos { get; }

        ConfigInfo ConfigInfos { get; }

        bool IsAdminLogin { get; set; }

        void LoadConfig();

    }
}

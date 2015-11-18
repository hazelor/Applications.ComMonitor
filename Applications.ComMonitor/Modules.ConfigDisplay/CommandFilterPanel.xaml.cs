using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.MsgFilterSettingPanel)]
    /// <summary>
    /// Interaction logic for CommandFilterPanel.xaml
    /// </summary>
    public partial class CommandFilterPanel : UserControl
    {
        public CommandFilterPanel()
        {
            InitializeComponent();
        }

        [Import(PanelNames.MsgFilterSetting, typeof(IConfViewModel))]
        private IConfViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
            }
        }
    }
}

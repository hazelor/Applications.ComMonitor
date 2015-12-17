using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
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
    [Export(PanelNames.LinkStateSettingPanel)]
    /// <summary>
    /// Interaction logic for LinkStateSettingPanel.xaml
    /// </summary>
    public partial class LinkStateSettingPanel : UserControl
    {
        public LinkStateSettingPanel()
        {
            InitializeComponent();
        }
        [Import(PanelNames.LinkStateSetting, typeof(IConfViewModel))]
        private LinkStateSettingViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
            }
        }
    }
}

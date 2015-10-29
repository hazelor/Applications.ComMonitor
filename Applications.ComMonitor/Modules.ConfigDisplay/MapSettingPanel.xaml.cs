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
    [Export(PanelNames.MapSettingPanel)]
    /// <summary>
    /// Interaction logic for MapSettingPanel.xaml
    /// </summary>
    public partial class MapSettingPanel : UserControl
    {
        public MapSettingPanel()
        {
            InitializeComponent();
        }
        [Import(PanelNames.MapSetting, typeof(IConfViewModel))]
        private MapSettingViewModel ViewModel
        {
            set 
            {
                this.DataContext = value;
            }
        }
    }
}

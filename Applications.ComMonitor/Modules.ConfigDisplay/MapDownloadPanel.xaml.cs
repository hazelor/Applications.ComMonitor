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
    [Export(PanelNames.MapDownloadPanel)]
    /// <summary>
    /// Interaction logic for MapDownloadPanel.xaml
    /// </summary>
    public partial class MapDownloadPanel : UserControl
    {
        public MapDownloadPanel()
        {
            InitializeComponent();
        }
        [Import(PanelNames.MapDownload, typeof(IConfViewModel))]
        private MapDownloadViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
            }
        }
    }
}

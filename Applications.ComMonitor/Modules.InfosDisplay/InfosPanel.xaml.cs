using Hazelor.MapCtrl;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Modules.InfosDisplay
{
    [Export("InfosPanel")]
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class InfosPanel : UserControl
    {
        public InfosPanel()
        {
            TileGenerator.CacheFolder = "Maps.db";
            TileGenerator.IsDBCaches = true;
            TileGenerator.DownloadCountChanged += this.OnDownloadCountChanged;
            TileGenerator.DownloadError += this.OnDownloadError;
            InitializeComponent();
        }


        private void OnDownloadCountChanged(object sender, EventArgs e)
        {
        }
        private void OnDownloadError(object sender, EventArgs e)
        {

        }

        private void OnLoadMap(object sender, RoutedEventArgs e)
        {
            this.tileCanvas.Center(44.2829, 115.8901, 11);
        }
        private void OnCloseMap(object sender, EventArgs e)
        {
            TileGenerator.DestructMap();
        }

    }
}

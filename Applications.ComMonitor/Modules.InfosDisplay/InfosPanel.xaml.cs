using Commons.Infrastructure.Events;
using Hazelor.MapCtrl;
using Modules.InfosDisplay.Lines;
using Modules.InfosDisplay.Nodes;
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

        private void SatelliteClick(object sender, RoutedEventArgs e)
        {

        }

        private void NormalClick(object sender, RoutedEventArgs e)
        {

        }


        [Import]
        InfosPanelViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
                ((InfosPanelViewModel)DataContext).NodeChangedEvent += OperationNode;
                ((InfosPanelViewModel)DataContext).LineChangedEvent += OperationLine;

            }
        }

        private void OperationNode(object sender, NodeChangeEventArg e)
        {
            if (e.oper == Operations.ADD)
            {
                FrameworkElement obj;
                switch(e.Node.NodeType)
                {
                    case 0:
                        {
                            obj = new Aerocraft();
                            break;
                        }
                    case 1:{
                        obj = new Boat();
                        break;
                    }
                    case 2:{
                        obj = new Vehicle();
                        break;
                    }
                    default:
                        {
                            obj = new Vehicle();
                            break;
                        }

                }
                this.tileCanvas.AddSingleObject(e.Node.ToString(), obj, e.Node);
            }
            else if (e.oper == Operations.DEL)
            {
                this.tileCanvas.DelSubObject(e.Node.ToString());
            }
        }

        private void OperationLine(object sender, LineChangeEventArg e)
        {
            if (e.oper==Operations.ADD)
            {
                FrameworkElement obj = new CLine();
                this.tileCanvas.AddLineObject(e.Line.ToString(), obj, e.Line);
                
            }
            else if (e.oper == Operations.DEL)
            {
                this.tileCanvas.DelSubObject(e.Line.ToString());
            }
        }
    }
}

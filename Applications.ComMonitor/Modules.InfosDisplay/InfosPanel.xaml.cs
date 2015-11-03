﻿using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Hazelor.MapCtrl;
using Microsoft.Practices.Prism.PubSubEvents;
using Modules.InfosDisplay.Lines;
using Modules.InfosDisplay.Nodes;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
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
        private IEventAggregator _eventAggregator;
        private IConfigService _configService;
        [ImportingConstructor]
        public InfosPanel(IEventAggregator eventAggregator, IConfigService configService)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            TileGenerator.CacheFolder = "Maps.db";
            TileGenerator.IsDBCaches = true;
            TileGenerator.DownloadCountChanged += this.OnDownloadCountChanged;
            TileGenerator.DownloadError += this.OnDownloadError;
            InitializeComponent();

            _eventAggregator.GetEvent<ConfigUpdateEvent>().Subscribe(OnConfigUpdated);
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
        

        private void OnConfigUpdated(bool sign)
        {
            if (System.IO.File.Exists(_configService.ConfigInfos.MapBackFilePath))
            {
                FileStream file = File.OpenRead(_configService.ConfigInfos.MapBackFilePath);

                var bitmap = new BitmapImage();

                bitmap.BeginInit();
                bitmap.CacheOption = BitmapCacheOption.OnLoad;
                bitmap.StreamSource = file;
                bitmap.EndInit();

                bitmap.Freeze(); // Very important - lets us download in one thread and pass it back to the UI

                TileGenerator.IBackGround = bitmap;
                this.tileCanvas.SetBackGround();
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

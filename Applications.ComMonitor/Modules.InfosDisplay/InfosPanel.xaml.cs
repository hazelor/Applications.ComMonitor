﻿using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Hazelor.MapCtrl;
using Hazelor.MapCtrl.Interfaces;
using Microsoft.Practices.Prism.Mvvm;
using Microsoft.Practices.Prism.PubSubEvents;
using Modules.InfosDisplay.Lines;
using Modules.InfosDisplay.Measure;
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
    public class MeasureNode : BindableBase, ISingleObjectContext
    {
        public string key { get; set; }

        private double _Latitude;
        public double Latitude { get { return this._Latitude; } set { SetProperty(ref this._Latitude, value); } }


        private double _Longtitude;
        public double Longitude { get { return this._Longtitude; } set { SetProperty(ref this._Longtitude, value); } }

        private double _Distance;
        public double Distance { get { return this._Distance; } set { SetProperty(ref this._Distance, value); } }

        public string keyLine { get; set; }
    }

    public class MeasureLineV:BindableBase, ILineOjbectContext
    {
        public string key { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public double EndLatitude { get; set; }
        public double EndLongitude { get; set; }
    }
    [Export("InfosPanel")]
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class InfosPanel : UserControl
    {

        private IEventAggregator _eventAggregator;
        private IConfigService _configService;
        private IProtocolService _protocolService;
        [ImportingConstructor]
        public InfosPanel(IEventAggregator eventAggregator, IConfigService configService, IProtocolService protocolService)
        {
            _eventAggregator = eventAggregator;
            _configService = configService;
            _protocolService = protocolService;
            //TileGenerator.CacheFolder = "MapsLiteDB{0}.db";
            TileGenerator.CacheFolder = "Maps";
            TileGenerator.IsDBCaches = false;
            TileGenerator.DownloadCountChanged += this.OnDownloadCountChanged;
            TileGenerator.DownloadError += this.OnDownloadError;
            InitializeComponent();
            //if (_configService.IsAdminLogin)
            //{
            //    InfoDisplayPanel.Visibility = Visibility.Visible;
            //}
            //按配置文件更新
            OnConfigUpdated(true);
            _eventAggregator.GetEvent<ConfigUpdateEvent>().Subscribe(OnConfigUpdated);
            _eventAggregator.GetEvent<ClearAllEvent>().Subscribe(OnClearAll, ThreadOption.UIThread);

            
        }

        private void OnSelectedNodeEvent(object sender, EventArgs e)
        {
            this.NodeInfo.Visibility = Visibility.Visible;
            //this.LineInfo.Visibility = Visibility.Visible;
        }

        private void OnSelectedLineEvent(object sender, EventArgs e)
        {
            //this.NodeInfo.Visibility = Visibility.Visible;
            this.LineInfo.Visibility = Visibility.Visible;
        }
        private void OnDownloadCountChanged(object sender, EventArgs e)
        {
        }

        private void OnDownloadError(object sender, EventArgs e)
        {

        }

        private void OnLoadMap(object sender, RoutedEventArgs e)
        {
            this.tileCanvas.Center(_configService.ConfigInfos.CenteredLatitude, _configService.ConfigInfos.CenteredLongitude, 13);
        }
        private void OnCloseMap(object sender, EventArgs e)
        {
            TileGenerator.DestructMap();
        }

        private void SatelliteClick(object sender, RoutedEventArgs e)
        {
            this.tileCanvas.ShowSat(this.SatShowButton.IsChecked == true);
        }

        private void NormalClick(object sender, RoutedEventArgs e)
        {
            this.tileCanvas.ShowNormal(this.NormalShowButton.IsChecked == true);
        }

        
        private void RoadClick(object sender, RoutedEventArgs e)
        {

            this.tileCanvas.ShowRoad(RoadShowButton.IsChecked == true);
        }

        private void NodeClick(object sender, RoutedEventArgs e)
        {
            if (this.NodeButton.IsChecked == true)
            {
                //set map drag false

                //set node drag true
                this.tileCanvas.IsCanDrag = false;

            }
            else
            {
                //set map drag true
                //set node drag false
                this.tileCanvas.IsCanDrag = true;
            }
        }
        private List<MeasureNode> MeasureItemsKey = new List<MeasureNode>();
        private void ClearMeasureInfo()
        {
            foreach (var item in MeasureItemsKey)
            {

                this.tileCanvas.DelSubObject(item.key);
                if (item.keyLine!= null)
                {
                    this.tileCanvas.DelSubObject(item.keyLine);
                }
                
            }
            MeasureItemsKey.Clear();
        }
        private void MeasureClick(object sender, RoutedEventArgs e)
        {
            if (this.MeasureButton.IsChecked == false)
            {
                //clear measure info
                this.ClearMeasureInfo();
            }
            else
            {
                //start measure

            }
        }

        private void CenterClick(object sender, RoutedEventArgs e)
        {
            InfosPanelViewModel ipVM = (InfosPanelViewModel)this.DataContext;
            if (ipVM.CommNodes == null || ipVM.CommNodes.Count == 0)
            {
                this.tileCanvas.Center(_configService.ConfigInfos.CenteredLatitude, _configService.ConfigInfos.CenteredLongitude, 13);
            }
            else
            {
                this.tileCanvas.Center(ipVM.CommNodes[0].Latitude, ipVM.CommNodes[0].Longitude, 13);
            }
        }

        

        
        protected override void OnMouseDoubleClick(MouseButtonEventArgs e)
        {
            base.OnMouseDoubleClick(e);
            if (this.MeasureButton.IsChecked == true)
            {
                Point pos = e.GetPosition(this);
                pos = this.tileCanvas.GetLocation(pos);
                double dist= 0;
                if (MeasureItemsKey.Count>0)
	            {
                    dist=MeasureItemsKey.Last().Distance + Math.Abs(this.tileCanvas.GetDistance(MeasureItemsKey.Last().Longitude,MeasureItemsKey.Last().Latitude,pos.X,pos.Y ));
	            }
                MeasureNode mn = new MeasureNode
                {
                    key = string.Format("Measure{0}", MeasureItemsKey.Count),
                    Latitude = pos.Y,
                    Longitude = pos.X,
                    Distance = dist
                };
                MeasureItemsKey.Add(mn);

                
                if (MeasureItemsKey.Count>1)
                {
                    MeasureLineV l = new MeasureLineV
                    {
                        Latitude = MeasureItemsKey[MeasureItemsKey.Count-2].Latitude,
                        Longitude = MeasureItemsKey[MeasureItemsKey.Count - 2].Longitude,
                        EndLatitude = pos.Y,
                        EndLongitude = pos.X,
                        key = MeasureItemsKey[MeasureItemsKey.Count - 2].key + ',' + mn.key,
                    };
                    mn.keyLine = l.key;
                    this.tileCanvas.AddLineObject(l.key,new MeasureLine(),l);
                }
                this.tileCanvas.AddSingleObject(mn.key, new MeasureMark(), mn);


            }
        }
        [Import]
        InfosPanelViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
                ((InfosPanelViewModel)DataContext).NodeChangedEvent += OperationNode;
                ((InfosPanelViewModel)DataContext).LineChangedEvent += OperationLine;
                ((InfosPanelViewModel)DataContext).SelectedNodeEvent += OnSelectedNodeEvent;
                ((InfosPanelViewModel)DataContext).SelectedLineEvent += OnSelectedLineEvent;
                 

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

            tileCanvas.ShowMap(_configService.ConfigInfos.IsMapShow);
        }

        private void OperationNode(object sender, NodeChangeEventArg e)
        {
            if (e.oper == Operations.ADD)
            {
                MapFrameElement obj;
                obj = new NodeDisplay();
                

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
                MapFrameElement obj = new CLine();
                this.tileCanvas.AddLineObject(e.Line.ToString(), obj, e.Line);
                ((InfosPanelViewModel)this.DataContext).ShowRouteLines();
                
            }
            else if (e.oper == Operations.DEL)
            {
                this.tileCanvas.DelSubObject(e.Line.ToString());
            }
        }

        private void OnClearAll(bool sign)
        {
            //foreach (var item in _protocolService.CommunicationNet.CommNodes)
            //{
            //    this.tileCanvas.DelSubObject(item.ToString());
            //}

            //foreach (var item in _protocolService.CommunicationNet.CommLines)
            //{
            //    this.tileCanvas.DelSubObject(item.ToString());
            //}

            //_protocolService.CommunicationNet.CommNodes.Clear();
            //_protocolService.CommunicationNet.CommLines.Clear();
        }
    }
}

using Commons.Infrastructure;
using Commons.Infrastructure.Interface;
using Hazelor.MapCtrl;
using Microsoft.Practices.Prism.Commands;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.MapDownload, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class MapDownloadViewModel : SubConfViewModelBase
    {
        private double _startLon, _startLat;
        private double _endLon, _endLat;
        private int _startLayer, _endLayer;

        public double StartLongitude
        {
            get
            {
                return this._startLon;
            }
            set
            {
                this._startLon = value;
            }
        }

        public double StartLatitude
        {
            get
            {
                return this._startLat;
            }
            set
            {
                this._startLat = value;
            }
        }

        public double EndLatitude
        {
            get
            {
                return this._endLat;
            }
            set
            {
                this._endLat = value;
            }
        }

        public double EndLongitude
        {
            get
            {
                return this._endLon;
            }
            set
            {
                this._endLon = value;
            }
        }

        public int StartLayer
        {
            get
            {
                return this._startLayer;
            }
            set
            {
                this._startLayer = value;
            }
        }
        public int EndLayer
        {
            get
            {
                return this._endLayer;
            }
            set
            {
                this._endLayer = value;
            }
        }

        private int _downloadCount = 0;
        public int DownloadCount
        {
            get
            {
                return this._downloadCount;
            }
            set
            {
                SetProperty(ref this._downloadCount, value);
            }
        }

        private int _totalCount = 0;
        public int TotalCount
        {
            get
            {
                return this._totalCount;
            }
            set
            {
                SetProperty(ref this._totalCount, value);
            }
        }
        [ImportingConstructor]
        public MapDownloadViewModel()
        {
            StartLongitude = 116;
            StartLatitude = 44;

            EndLatitude = 45;
            EndLongitude = 117;

            StartLayer = 10;
            EndLayer = 11;

            Uri = PanelNames.MapDownloadPanel;
            Name = "地图下载";

            ApplyCommand = new DelegateCommand(ApplyExecuted);

            DownLoadTilesCommand = new DelegateCommand(DownLoadTilesExecuted);
            TileGenerator.DownloadCountChanged += this.OnDownloadCountChanged;
        }
        private void ApplyExecuted()
        {
        }
        private void OnDownloadCountChanged(object sender, EventArgs e)
        {
            DownloadCount = TileGenerator.DLCount;
            if (DownloadCount>= TotalCount-1)
            {
                IsEnable = true;
            }
        }

        public DelegateCommand DownLoadTilesCommand { get; set; }

        private bool _IsEnable = true;
        public bool IsEnable
        {
            get
            {
                return this._IsEnable;
            }
            set
            {
                SetProperty(ref this._IsEnable, value);
            }
        }

        private void DownLoadTilesExecuted()
        {
            TotalCount = TileGenerator.GetToalTilesCount(
                this._startLon,
                this._startLat, this._endLon,
                this._endLat, this._startLayer,
                this._endLayer);

            Thread t = new Thread(DownloadTiles);

            IsEnable = false;

            t.Start();

        }

        private void DownloadTiles()
        {
            TileGenerator.DownloadTiles(
                this._startLon,
                this._startLat, this._endLon,
                this._endLat, this._startLayer,
                this._endLayer);
        }
    }
}

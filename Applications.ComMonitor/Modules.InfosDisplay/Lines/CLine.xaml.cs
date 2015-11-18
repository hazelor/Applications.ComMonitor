using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Tools;
using Hazelor.MapCtrl;
using Hazelor.MapCtrl.Interfaces;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.ServiceLocation;
using Modules.InfosDisplay.Event;
using System;
using System.Collections.Generic;
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

namespace Modules.InfosDisplay.Lines
{
    /// <summary>
    /// Interaction logic for CLine.xaml
    /// </summary>
    public partial class CLine : MapFrameElement, ILineElement
    {
        private IEventAggregator _eventAggregator;
        public CLine()
        {
            _eventAggregator = ServiceLocator.Current.GetInstance<IEventAggregator>();
            InitializeComponent();
        }
        protected override void OnMouseDoubleClick(System.Windows.Input.MouseButtonEventArgs e)
        {
            CommLine cl = this.DataContext as CommLine;
            _eventAggregator.GetEvent<SelLineEvent>().Publish(cl);
            base.OnMouseDoubleClick(e);

        }
        public Arrow PreLineObject
        {
            get
            {
                return this.PreTLine;
            }
        }
        public Arrow BacLineObject
        {
            get
            {
                return this.BacTLine;
            }
        }

        //public Arrow BacLineObject
        //{
        //    get
        //    {
        //        return this.TrajectoryLineBac;
        //    }
        //}
    }
}

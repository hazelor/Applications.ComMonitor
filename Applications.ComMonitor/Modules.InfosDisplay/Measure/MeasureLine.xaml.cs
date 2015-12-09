using Hazelor.Infrastructure.Tools;
using Hazelor.MapCtrl;
using Hazelor.MapCtrl.Interfaces;
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

namespace Modules.InfosDisplay.Measure
{
    /// <summary>
    /// Interaction logic for MeasureLine.xaml
    /// </summary>
    public partial class MeasureLine : MapFrameElement, ILineElement
    {
        public MeasureLine()
        {
            InitializeComponent();
        }
        public double Radius
        {
            get
            {
                return 0;
            }
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
    }
}

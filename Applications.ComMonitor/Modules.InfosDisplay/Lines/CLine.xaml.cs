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

namespace Modules.InfosDisplay.Lines
{
    /// <summary>
    /// Interaction logic for CLine.xaml
    /// </summary>
    public partial class CLine : UserControl, ILineElement
    {
        public CLine()
        {
            InitializeComponent();
        }

        public Line LineObject
        {
            get
            {
                return this.TrajectoryLine;
            }
        }
    }
}

using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.IO;
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

namespace Modules.InfosDisplay.Nodes
{
    /// <summary>
    /// Interaction logic for NodeDisplay.xaml
    /// </summary>
    public partial class NodeDisplay : NodeBase
    {
        public NodeDisplay()
            : base()
        {
            InitializeComponent();
        }

        protected override void OnSelectedNodeChanged(CommNode cn)
        {
            if (cn == this.DataContext)
            {
                this.Shadow.Color = Colors.Green;
            }
            else
            {
                this.Shadow.Color = Colors.Black;
            }

        }

        public override void LoadImage()
        {
            CommNode cn = (CommNode)(this.DataContext);
            if (!System.IO.File.Exists(cn.ImagePath))
            {
                return;
            }
            FileStream file = File.OpenRead(cn.ImagePath);
            var bitmap = new BitmapImage();

            bitmap.BeginInit();
            bitmap.CacheOption = BitmapCacheOption.OnLoad;
            bitmap.StreamSource = file;
            bitmap.EndInit();

            bitmap.Freeze();

            this.Icon.Source = bitmap;
        }
    }
}

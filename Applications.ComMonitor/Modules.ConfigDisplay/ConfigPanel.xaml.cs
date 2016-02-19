using Commons.Infrastructure;
using Commons.Infrastructure.Behaviros;
using Commons.Infrastructure.Interface;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Regions;
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

namespace Modules.ConfigDisplay
{
    [ViewExport(RegionName = RegionNames.ConfigRegion)]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class ConfigPanel : UserControl
    {
      
        public ConfigPanel()
        {
            InitializeComponent();
            
        }
        [Import(typeof(IConfigPanelViewModel))]
        private ConfigPanelViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
            }
        }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            ConfigPanelViewModel vm = (ConfigPanelViewModel)this.DataContext;
            vm.Init();
        }
        

        

    }
}

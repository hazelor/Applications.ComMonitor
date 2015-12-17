using Commons.Infrastructure;
using Commons.Infrastructure.Events;
using Commons.Infrastructure.Interface;
using Microsoft.Practices.Prism.PubSubEvents;
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

namespace Applications.ComMonitor
{
    [Export(typeof(Shell))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class Shell : Window, IPartImportsSatisfiedNotification
    {
        private static Uri InfoDisplayUri = new Uri("InfosPanel", UriKind.Relative);
        private static Uri TopologyDisplayUri = new Uri("TopologyPanel", UriKind.Relative);

        [Import]
        private IRegionManager regionManager;

        //[Import]
        //private IProtocolService _protocolService;
        public Shell()
        {
            InitializeComponent();
        }

        [Import]
        private ShellViewModel ViewModel
        {
            set
            {
                this.DataContext = value;
            }
        }

        void IPartImportsSatisfiedNotification.OnImportsSatisfied()
        {
            //IRegion mainContentRegion = this.regionManager.Regions[RegionNames.BottomRegion];
            //if (mainContentRegion != null && mainContentRegion.NavigationService != null)
            //{
            //    mainContentRegion.NavigationService.Navigated += this.MainContentRegion_Navigated;
            //}
        }

        private void OnNodesDisplayClick(object sender, RoutedEventArgs e)
        {
            this.regionManager.RequestNavigate(RegionNames.MainRegion, InfoDisplayUri);
        }

        private void OnTopoloyDisplayClick(object sender, RoutedEventArgs e)
        {
            this.regionManager.RequestNavigate(RegionNames.MainRegion, TopologyDisplayUri);
        }

        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            this.NodeDisplayButton.IsChecked = true;
            this.regionManager.RequestNavigate(RegionNames.MainRegion, InfoDisplayUri);
        }

        private void OnExit(object sender, RoutedEventArgs e)
        {
            //_protocolService.StopChannel();
            Application.Current.Shutdown();
        }

        protected override void OnClosed(EventArgs e)
        {
            Application.Current.Shutdown();
            base.OnClosed(e);
        }
        //private void OnMinimize(object sender, RoutedEventArgs e)
        //{
        //    ((Window)this).WindowState = WindowState.Minimized; 
        //}
        private void OnMinimize(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        private void OnNormal(object sender, RoutedEventArgs e)
        {
            if (this.WindowState == WindowState.Maximized)
            {
                this.WindowState = WindowState.Normal;
            }
            else
            {
                this.WindowState = WindowState.Maximized;
            }
        }

        private void Window_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                this.DragMove();
            }
        }
    }
}
﻿using Applications.ComMonitor.Interactions;
using Applications.ComMonitor.Notification;
using Commons.Infrastructure.Interactions;
using Hazelor.Infrastructure.Tools;
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

namespace Applications.ComMonitor
{
    /// <summary>
    /// Interaction logic for ConfigPanel.xaml
    /// </summary>
    public partial class ConfigPanel : ConfigInterationDialog, IGenericInteractionView<ConfigNotification>, IGenericAdapter<ConfigNotification>
    {
        private readonly IGenericAdapter<ConfigNotification> adapter;
        public ConfigPanel()
        {
            this.adapter = new ConfigAdapter();
            this.DataContext = this.ViewModel;
            InitializeComponent();
        }
        public void SetEntity(ConfigNotification entity)
        {
            this.ViewModel.SetEntity(entity);
        }

        public ConfigNotification GetEntity()
        {
            return this.ViewModel.GetEntity();
        }

        public IGenericViewModel<ConfigNotification> ViewModel
        {
            get { return this.adapter.ViewModel; }
        }

        public override void Ok()
        {
            ConfigNotification an = this.ViewModel.GetEntity();

        }
    }
}

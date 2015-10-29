using Applications.ComMonitor.Interactions;
using Applications.ComMonitor.Notification;
using Commons.Infrastructure.Interactions;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.ServiceLocation;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
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
    /// Interaction logic for AdminLoginPanel.xaml
    /// </summary>
    public partial class AdminLoginPanel : AdminLoginInterationDialog, IGenericInteractionView<AdminLoginNotification>, IGenericAdapter<AdminLoginNotification>
    {
        private readonly IGenericAdapter<AdminLoginNotification> adapter;
        public AdminLoginPanel()
        {
            this.adapter = new GenericAdapter<AdminLoginNotification>();
            this.DataContext = this.ViewModel;
            InitializeComponent();
            }
        public void SetEntity(AdminLoginNotification entity)
        {
            this.ViewModel.SetEntity(entity);
        }

        public AdminLoginNotification GetEntity()
        {
            return this.ViewModel.GetEntity();
        }

        public IGenericViewModel<AdminLoginNotification> ViewModel
        {
            get { return this.adapter.ViewModel; }
        }

        public override void Ok()
        {
            AdminLoginNotification an = this.ViewModel.GetEntity();

            if (an.AdminNameInput == an.AdminName && an.AdminPassword == MD5Converter.GetMD5(an.AdminPasswordInput))
            {
                an.Confirmed = true;
                base.Ok();
            }
            else
            {
                //密码不正确
            }

        }

        //[Import]
        //private AdminLoginPanelViewModel ViewModel
        //{
        //    set
        //    {
        //        this.DataContext = value;
        //    }
        //}
    }
}

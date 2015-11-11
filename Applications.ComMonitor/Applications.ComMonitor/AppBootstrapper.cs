using Commons.Infrastructure;
using Commons.Infrastructure.Behaviros;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Logging;
using Microsoft.Practices.Prism.MefExtensions;
using Microsoft.Practices.Prism.Modularity;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Applications.ComMonitor
{
    class AppBootstrapper : MefBootstrapper
    {
        private readonly EnterpriseLibraryLoggerAdapter _logger = new EnterpriseLibraryLoggerAdapter();

        protected override ILoggerFacade CreateLogger()
        {
            return _logger;
        }

        protected override DependencyObject CreateShell()
        {
            return this.Container.GetExportedValue<Shell>();
        }

        protected override void InitializeShell()
        {
            base.InitializeShell();

            Application.Current.MainWindow = (Shell)this.Shell;
            Application.Current.MainWindow.Show(); 


        }

        protected override void ConfigureAggregateCatalog()
        {
            base.ConfigureAggregateCatalog();
            this.AggregateCatalog.Catalogs.Add(new AssemblyCatalog(typeof(AppBootstrapper).Assembly));
            // 添加Common 模块
            DirectoryCatalog catalog = new DirectoryCatalog("Commons");
            this.AggregateCatalog.Catalogs.Add(catalog);
            // 添加Modules 模块
            catalog = new DirectoryCatalog("Modules");
            this.AggregateCatalog.Catalogs.Add(catalog);
            // 添加Services 模块
            catalog = new DirectoryCatalog("Services");
            this.AggregateCatalog.Catalogs.Add(catalog);

        }

        protected override void ConfigureContainer()
        {
            base.ConfigureContainer();

            // Because we created the CallbackLogger and it needs to be used immediately, we compose it to satisfy any imports it has.
        }

        protected override Microsoft.Practices.Prism.Regions.IRegionBehaviorFactory ConfigureDefaultRegionBehaviors()
        {
            var factory = base.ConfigureDefaultRegionBehaviors();

            factory.AddIfMissing("AutoPopulateExportedViewsBehavior", typeof(AutoPopulateExportedViewsBehavior));

            return factory;
        }

        protected override IModuleCatalog CreateModuleCatalog()
        {
            // When using MEF, the existing Prism ModuleCatalog is still the place to configure modules via configuration files.
            return new ConfigurationModuleCatalog();
        }
    }
}

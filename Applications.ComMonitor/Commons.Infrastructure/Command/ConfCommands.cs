using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Command
{
    public static class ConfCommands
    {

        private static CompositeCommand _ApplyConfCommand = new CompositeCommand();

        public static CompositeCommand ApplyConfCommand
        {
            get { return _ApplyConfCommand; }
            set { _ApplyConfCommand = value; }
        }
    }

    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class ConfCommandProxy
    {
        virtual public CompositeCommand ApplyConfCommand
        {
            get
            {
                return ConfCommands.ApplyConfCommand;
            }
        }
    }

    public static class AdminLoginCommands
    {
        private static DelegateCommand _LoginCommand;

        public static DelegateCommand LoginCommand
        {
            get { return _LoginCommand; }
            set { _LoginCommand = value; }
        }
    }

    

    public static class AdminLoginedCommands
    {
        private static CompositeCommand _LoginedCommand = new CompositeCommand();

        public static CompositeCommand LoginedCommand
        {
            get { return _LoginedCommand; }
            set { _LoginedCommand = value; }
        }
    }

    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class LoginedCommandProxy
    {
        virtual public CompositeCommand LoginedCommand
        {
            get
            {
                return AdminLoginedCommands.LoginedCommand;
            }
        }
    }
}

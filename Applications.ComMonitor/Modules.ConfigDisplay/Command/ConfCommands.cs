using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay.Command
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
}

using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Modules.ConfigDisplay.Tool
{
    public class MsgItemTemplateSelector : DataTemplateSelector
    {
        public DataTemplate BaseTemplate { get; set; }
        public DataTemplate MsgTemplate { get; set; }
        
        public override DataTemplate SelectTemplate(object item, DependencyObject container)
        {
            MsgItem msgitem = item as MsgItem;
            if (msgitem != null)
            {
                return MsgTemplate;
            }

            BaseNameItem baseitem = item as BaseNameItem;
            if (baseitem != null)
            {
                return BaseTemplate;
            }
            
            return base.SelectTemplate(item, container);
        }
    }
}

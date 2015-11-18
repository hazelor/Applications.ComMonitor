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
    public class SettingItemTemplateSelector : DataTemplateSelector
    {
        public DataTemplate ComboxTemplate { get; set; }
        public DataTemplate TextBoxTemplate { get; set; }

        public override DataTemplate SelectTemplate(object item, DependencyObject container)
        {
            FieldShell<STRU_OLSR_PARAME> setitem = item as FieldShell<STRU_OLSR_PARAME>;
            if (setitem != null)
            {
                if (setitem.Enums == null)
                {
                    return TextBoxTemplate;
                }
                else
                {
                    return ComboxTemplate;
                }
            }
            FieldShell<STRU_WIFI_PARAME> setwitem = item as FieldShell<STRU_WIFI_PARAME>;
            if (setwitem != null)
            {
                if (setwitem.Enums == null)
                {
                    return TextBoxTemplate;
                }
                else
                {
                    return ComboxTemplate;
                }
            }

            return base.SelectTemplate(item, container);
        }
    }
}



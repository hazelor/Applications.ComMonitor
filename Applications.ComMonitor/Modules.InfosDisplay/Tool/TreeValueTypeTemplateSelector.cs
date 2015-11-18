using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Modules.InfosDisplay.Tool
{
    public class TreeValueTypeTemplateSelector : DataTemplateSelector
    {
        public DataTemplate AddrTemplate { get; set; }
        public DataTemplate AddrListTemplate { get; set; }
        public DataTemplate NumberTemplate { get; set; }

        public override DataTemplate SelectTemplate(object item, DependencyObject container)
        {
            byte? num = item as byte?;
            if (num != null)
            {
                return NumberTemplate;
            }

            ushort? weight = item as ushort?;
            if (weight != null)
            {
                return NumberTemplate;
            }
            byte[] prc = item as byte[];
            if (prc != null)
            {
                if (prc.Length == 240)
                {
                    return AddrListTemplate;
                }
                else
                {
                    return AddrTemplate;
                }

            }
            return base.SelectTemplate(item, container);
        }
    }

}

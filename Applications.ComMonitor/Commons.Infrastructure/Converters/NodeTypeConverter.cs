using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace Commons.Infrastructure.Converters
{

    public class NodeTypeConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var nodetype = value as byte?;
            string typestr = "未知";
            if (nodetype == null)
            {
                return typestr;
            }
            else
            {
                EnumNodeType ent = (EnumNodeType)nodetype;
                FieldInfo fieldinfo = typeof(EnumNodeType).GetField(ent.ToString());
                Object[] objs = fieldinfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (objs == null || objs.Length == 0)
                {
                    return typestr;
                }
                else
                {
                    DescriptionAttribute da = (DescriptionAttribute)objs[0];
                    return da.Description;
                }
            }

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

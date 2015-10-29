using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace Commons.Infrastructure.Converters
{

    public class VisibleConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var isVisible = value as bool?;
            if (isVisible == null || isVisible == false)
            {
                return Visibility.Hidden;
            }
            else
            {
                return Visibility.Visible;
            }

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

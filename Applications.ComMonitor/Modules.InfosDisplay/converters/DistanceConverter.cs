using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Modules.InfosDisplay.converters
{
    class DistanceConverter : IValueConverter
    {
        #region IValueConverter Members

        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var result = value as double?;

            if (result == null)
                result = 0;

            return System.String.Format(CultureInfo.CurrentUICulture, "{0:f2}km", result.Value);
        }

        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class DBConverter : IValueConverter
    {
        #region IValueConverter Members

        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var result = value as int?;

            if (result == null)
                return "无信号";

            return System.String.Format(CultureInfo.CurrentUICulture, "{0}db", result.Value);
        }

        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

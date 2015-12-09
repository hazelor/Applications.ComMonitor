using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Commons.Infrastructure.Converters
{
    public class LatLonConverter : IValueConverter
    {
        #region IValueConverter Members

        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var result = value as double?;

            if (result == null)
                result = 0;

            return System.String.Format(CultureInfo.CurrentUICulture, "{0:f7}°", result.Value);
        }

        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class AltConverter: IValueConverter
    {
        #region IValueConverter Members

        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var result = value as double?;

            if (result == null)
                result = 0;
            result = result / 1000;
            return System.String.Format(CultureInfo.CurrentUICulture, "{0:f2}km", result.Value);
        }

        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class FreqConverter : IValueConverter
    {
        #region IValueConverter Members

        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var result = value as byte?;

            if (result == null)
                return "不存在";

            byte res = (byte)result;
            EnumFreq ef = (EnumFreq)res;
            FieldInfo fi = typeof(EnumFreq).GetField(Enum.GetName(typeof(EnumFreq), res));
            DescriptionAttribute da = (DescriptionAttribute)fi.GetCustomAttribute(typeof(DescriptionAttribute));
            if(da == null)
            {
                return Enum.GetName(typeof(EnumFreq), res);
            }
            else
            {
                return da.Description;
            }


            
            
        }

        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

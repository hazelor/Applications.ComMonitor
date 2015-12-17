using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;

namespace Modules.InfosDisplay.converters
{
    public class QuaulityConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var State = value as CommStatues?;
            switch (State)
            {
                case CommStatues.NON:
                    return Brushes.Transparent;
                case CommStatues.BAD:
                    return Brushes.Red;
                case CommStatues.NORMAL:
                    return Brushes.Red;
                case CommStatues.GOOD:
                    return Brushes.Yellow;
                case CommStatues.EXCELLENT:
                    return Brushes.Lime;
                default:
                    return Brushes.Transparent;
            }

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class DashAvailableConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            DoubleCollection dc = new DoubleCollection();
            dc.Add(2);
            dc.Add(2);
            var State = value as bool?;
            if (State == null || State == false)
            {

                return dc;
            }
            else
            {
                dc[0] = 1;
                dc[1] = 0;
                return dc;
            }

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class ItemVisibleConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var State1 = value as CommNode;
            var State2 = value as CommLine;
            if (State1== null && State2 == null)
            {
                return Visibility.Collapsed;
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

    public class LineVisibleConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            var IsUsed = value as int?;

            if (IsUsed == 1)
            {
                return Visibility.Visible;
            }
            else
            {
                return Visibility.Collapsed;
            }

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

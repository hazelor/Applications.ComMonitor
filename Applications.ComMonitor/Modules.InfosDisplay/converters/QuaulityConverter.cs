using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                    return Brushes.Yellow;
                case CommStatues.GOOD:
                    return Brushes.Orange;
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
}

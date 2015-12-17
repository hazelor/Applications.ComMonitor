using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace Modules.InfosDisplay.Tool
{
    public class AddrConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            byte[] addr = value as byte[];

            if (addr == null && addr.Length != 8)
            {
                return "";
            }

            string addrStr = "";
            for (int i = 0; i < addr.Length; i++)
            {
                addrStr += addr[i].ToString("X") + " ";
            }
            return addrStr;

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class AddrListConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            byte[] addr = value as byte[];
            if (addr == null && addr.Length !=240)
            {
                return "";
            }
            string addrStr = "";
            for (int i = 0; i < addr.Length; i++)
            {
                if (i%8 == 0 && i!=0)
                {
                    addrStr += addr[i].ToString("X") + " ";
                    addrStr += '\n';
                }
                else
                {
                    addrStr += addr[i].ToString("X") + " ";
                }
                
            }
            return addrStr;

        }
        public object ConvertBack(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    public class LinkInfoVisiableConverter : IValueConverter
    {
        #region IValueConverter Members
        public object Convert(object value, System.Type targetType, object parameter, CultureInfo culture)
        {
            bool? res = value as bool?;

            if (res== true)
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

using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Modules.InfosDisplay.converters
{
    class LineNameConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            CommNode selNode = value[1] as CommNode;
            if (line!= null &&selNode!=null&& selNode.Index == line.StartNode.Index)
            {
                return string.Format("{0}-->{1}", line.StartNode.NodeName, line.EndNode.NodeName);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                return string.Format("{0}-->{1}", line.EndNode.NodeName, line.StartNode.NodeName);
            }
            return "";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
    class PreNameConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            CommNode selNode = value[1] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                return selNode.NodeName;
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                return selNode.NodeName;
            }
            return "";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class BacNameConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            CommNode selNode = value[1] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                return line.EndNode.NodeName;
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                return line.StartNode.NodeName;
            }
            return "";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
    class InfoQualityConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreInfoQuality = value[1] as int?;
            int? BacInfoQuality = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line!=null && selNode!=null && selNode.Index == line.StartNode.Index)
            {
                if (PreInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm",PreInfoQuality);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (BacInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", BacInfoQuality);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class SignalNoiseRatioConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreSignalNoiseRatio = value[1] as int?;
            int? BacSignalNoiseRatio = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                if (PreSignalNoiseRatio == 0)
                    return "-";
                else
                    return string.Format("{0}dB", PreSignalNoiseRatio);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (BacSignalNoiseRatio == 0)
                    return "-";
                else
                    return string.Format("{0}dB", BacSignalNoiseRatio);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class WhiteInfoQualityConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreWhiteInfoQuality = value[1] as int?;
            int? BacWhiteInfoQuality = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                if (PreWhiteInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", line.PreWhiteInfoQuality);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (BacWhiteInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", line.BacWhiteInfoQuality);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class SInfoQualityConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreInfoQuality = value[1] as int?;
            int? BacInfoQuality = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                if (BacInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", BacInfoQuality);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (PreInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", PreInfoQuality);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class SSignalNoiseRatioConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreSignalNoiseRatio = value[1] as int?;
            int? BacSignalNoiseRatio = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                if (BacSignalNoiseRatio == 0)
                    return "-";
                else
                    return string.Format("{0}dB", BacSignalNoiseRatio);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (PreSignalNoiseRatio == 0)
                    return "-";
                else
                    return string.Format("{0}dB", PreSignalNoiseRatio);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }

    class SWhiteInfoQualityConverter : IMultiValueConverter
    {
        #region IValueConverter Members

        public object Convert(object[] value, System.Type targetType, object parameter, CultureInfo culture)
        {
            CommLine line = value[0] as CommLine;
            int? PreWhiteInfoQuality = value[1] as int?;
            int? BacWhiteInfoQuality = value[2] as int?;
            CommNode selNode = value[3] as CommNode;
            if (line != null && selNode != null && selNode.Index == line.StartNode.Index)
            {
                if (BacWhiteInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", line.BacWhiteInfoQuality);
            }
            if (line != null && selNode != null && selNode.Index == line.EndNode.Index)
            {
                if (PreWhiteInfoQuality == 0)
                    return "-";
                else
                    return string.Format("{0}dBm", line.PreWhiteInfoQuality);
            }
            return "-";
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new System.NotImplementedException();
        }

        #endregion
    }
}

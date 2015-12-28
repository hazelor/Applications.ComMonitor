using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Modules.TopologyDisplay.ValidationRules
{
    public class IPValidationRule : ValidationRule
    {
        Regex IPRegex = new Regex(@"((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))");
        
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            string str = value as string;
            if (str == null)
                return new ValidationResult(false, "不能为空值！");
            if (!IPRegex.IsMatch(str))
                return new ValidationResult(false, "IP格式不正确！");

            return new ValidationResult(true, null);
        }
    }
}

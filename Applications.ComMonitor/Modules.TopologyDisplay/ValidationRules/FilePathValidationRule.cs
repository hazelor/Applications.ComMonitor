using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Modules.TopologyDisplay.ValidationRules
{
    public class FilePathValidationRule : ValidationRule
    {
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            string str = value as string;
            if (str == null|| string.IsNullOrEmpty(str))
                return new ValidationResult(false, "不能为空值！");
            if (!System.IO.File.Exists(str))
                return new ValidationResult(false, "文件不存在！");

            return new ValidationResult(true, null);
        }
    }
}

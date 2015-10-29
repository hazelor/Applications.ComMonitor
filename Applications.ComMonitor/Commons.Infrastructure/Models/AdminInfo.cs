using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Commons.Infrastructure.Models
{
    public class AdminInfo : ISerializeModel
    {
        public string FilePath { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}

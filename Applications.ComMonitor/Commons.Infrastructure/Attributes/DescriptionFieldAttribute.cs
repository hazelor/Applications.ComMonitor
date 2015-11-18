using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Attributes
{
    public enum FieldTypeEnum
    {
        String,
        Byte,
        Enum,
        Ushort,
        Int,
    }
    public class DescriptionFieldAttribute : Attribute
    {
        public int Size { get; set; }

        public string Description { get; set; }

        public FieldTypeEnum FieldType { get; set; }

        public Type EnumType { get; set; }
    }
}

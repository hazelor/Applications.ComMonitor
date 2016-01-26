using Commons.Infrastructure.Attributes;
using Hazelor.Infrastructure.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Modules.ConfigDisplay.Tool
{
    public class StructShell<T>
    {
        public T Instance { get; set; }

        private List<FieldShell<T>> _SubField = new List<FieldShell<T>>();
        public List<FieldShell<T>> SubField
        {
            get
            {
                return this._SubField;
            }
        }
        public void NotifySubFieldChanged()
        {
            foreach (var f in SubField)
            {
                f.NotifyChanged();
            }
        }
        public void ParseStruct()
        {
            Type t = typeof(T);
            FieldInfo[] fis = t.GetFields();
            foreach (var fi in fis)
            {
                FieldShell<T> fs = new FieldShell<T>();
                DescriptionFieldAttribute dfa = (DescriptionFieldAttribute)fi.GetCustomAttribute(typeof(DescriptionFieldAttribute));
                if (dfa != null)
                {
                    fs.FieldDescription = dfa;
                    fs.Info = fi;
                    fs.ParantStruct = this;
                    fs.ParseEnums();
                    this.SubField.Add(fs);
                }
                
            }
        }
    }


    public class EnumShell
    {
        public string Description { get; set; }
        public string Value { get; set; }
    }
    public class FieldShell<T> : INotifyPropertyChanged
    {
        public DescriptionFieldAttribute FieldDescription{get;set;}

        public StructShell<T> ParantStruct { get; set; }

        public FieldInfo Info { get; set; }

        public event PropertyChangedEventHandler PropertyChanged; 
        public void NotifyChanged()
        {
            if (PropertyChanged!=null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs("Description"));
                PropertyChanged(this, new PropertyChangedEventArgs("Value")); 
            }
            
        }

        public string Description
        {
            get
            {
                if (FieldDescription == null)
	            {
                    return Info.Name;
	            }
                else{
                    return this.FieldDescription.Description;
                }
                
            }
        }

        public string Value
        {
            get
            {
                object tmp = Info.GetValue(ParantStruct.Instance);
                return ConvertBack(tmp);
               
            }

            set
            {
                ConvertFrom(value);
            }
        }

        public List<EnumShell> Enums { get; set; }

        public void ParseEnums()
        {
            if (FieldDescription == null)
            {
                return;
            }
            if (FieldDescription.EnumType == null)
            {
                return;
            }

            FieldInfo[] EnumInfos = FieldDescription.EnumType.GetFields();
            if (EnumInfos == null)
            {
                return;
            }

            Enums = new List<EnumShell>();
            
            foreach (var item in EnumInfos)
            {
                if (item.FieldType.Name != FieldDescription.EnumType.Name)
                {
                    continue;
                }
                DescriptionAttribute da = (DescriptionAttribute)item.GetCustomAttribute(typeof(DescriptionAttribute));
                EnumShell es = new EnumShell();
                if (da == null)
                {
                    es.Value = string.Format("{0}", (int)item.GetValue(FieldDescription.EnumType));
                    es.Description = item.Name;
                }
                else
                {
                    es.Value = string.Format("{0}", (int)item.GetValue(FieldDescription.EnumType));
                    es.Description = da.Description;
                }
                    
                Enums.Add(es);
            }
        }

        #region ConvertMethod
        private string ConvertBack(object src)
        {
            if (FieldDescription == null)
            {
                return src.ToString();
            }
            else
            {
                switch (FieldDescription.FieldType)
                {
                    case FieldTypeEnum.String:
                        byte[] srcArray = src as byte[];
                        if (srcArray == null)
	                    {
                            return src.ToString();
	                    }

                        string tmp = "";
                        tmp = System.Text.Encoding.Default.GetString(srcArray);
                        tmp = tmp.TrimEnd((char)0);
                        return tmp;
                    case FieldTypeEnum.Byte:
                        byte? srcByte = src as byte?;
                        if (srcByte == null)
                        {
                            return src.ToString();
                        }
                        else
                        {
                            return srcByte.ToString();
                        }
                    case FieldTypeEnum.Enum:
                        return src.ToString();
                    case FieldTypeEnum.Ushort:
                        return src.ToString();
                    case FieldTypeEnum.Int:
                        return src.ToString();
                    default:
                        return src.ToString();
                }
            }
            
        }

        private void ConvertFrom(string v)
        {
            object obj = ParantStruct.Instance;
            switch (FieldDescription.FieldType)
            {
                case FieldTypeEnum.String:
                    byte[] src = System.Text.Encoding.Default.GetBytes(v);
                    byte[] dststr = new byte[FieldDescription.Size];
                    Buffer.BlockCopy(src, 0, dststr, 0, src.Length < FieldDescription.Size ? src.Length : FieldDescription.Size);
                        Info.SetValue(obj, dststr);
                    break;
                case FieldTypeEnum.Byte:
                    byte dstbyte = 0;
                    if (byte.TryParse(v, out dstbyte))
                    {
                        Info.SetValue(obj, dstbyte);
                    }
                    break;
                case FieldTypeEnum.Enum:
                    byte dstEnum;
                    if (byte.TryParse(v, out dstEnum))
                    {
                        Info.SetValue(obj, dstEnum);
                    }
                    break;
                case FieldTypeEnum.Ushort:
                    ushort dstushort = 0;
                    if (ushort.TryParse(v, out dstushort))
                    {
                        Info.SetValue(obj, dstushort);
                    }
                    break;
                case FieldTypeEnum.Int:
                    int dstInt = 0;
                    if (int.TryParse(v, out dstInt))
                    {
                        Info.SetValue(obj, dstInt);
                    }
                    break;
                default:
                    break;
            }
            ParantStruct.Instance = (T)obj;
        }

        #endregion
    }


    
}

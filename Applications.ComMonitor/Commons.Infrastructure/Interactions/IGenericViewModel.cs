using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Interactions
{
    public interface IGenericViewModel<T> : IGenericInteractionView<T>, INotifyPropertyChanged
    {
        T Entity { get; set; }
    }
}

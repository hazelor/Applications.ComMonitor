using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Interactions
{
    public interface IGenericAdapter<T>
    {
        IGenericViewModel<T> ViewModel { get; }
    }
}

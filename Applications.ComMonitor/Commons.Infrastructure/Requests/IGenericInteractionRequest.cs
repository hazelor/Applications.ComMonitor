using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Requests
{
    public interface IGenericInteractionRequest<T>
    {
        event EventHandler<GenericInteractionRequestEventArgs<T>> Raised;
    }
}

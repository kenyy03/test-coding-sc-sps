using Microsoft.Extensions.DependencyInjection;

namespace Poliza.Core.Interfaces
{
    public interface IUnitOfWorkBuilder
    {
        IServiceCollection Services { get; }
    }
}

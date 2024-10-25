using Microsoft.Extensions.DependencyInjection;
using Poliza.Core.Interfaces;
using Poliza.Infraestructure.Uof;

namespace Poliza.Infraestructure.Extensions
{
    public static class UnitOfWorkBuilder
    {
        public static void AddUnitOfWorkBuilder(this IServiceCollection services, Action<IUnitOfWorkFactory, IServiceProvider> configure)
        {
            services.AddScoped((Func<IServiceProvider, IUnitOfWorkFactory>)delegate (IServiceProvider resolver)
            {
                UnitOfWorkFactory unitOfWorkFactory = new UnitOfWorkFactory();
                configure(unitOfWorkFactory, resolver);
                return unitOfWorkFactory;
            });
        }
    }
}

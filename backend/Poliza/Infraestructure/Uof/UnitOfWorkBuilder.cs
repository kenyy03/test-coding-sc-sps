using Microsoft.Extensions.DependencyInjection;
using Poliza.Core.Interfaces;

namespace Poliza.Infraestructure.Uof
{
    public class UnitOfWorkBuilder : IUnitOfWorkBuilder
    {
        private readonly IServiceCollection _services;

        public UnitOfWorkBuilder(IServiceCollection services)
        {
            _services = services;
        }

        public IServiceCollection Services => _services;
    }
}

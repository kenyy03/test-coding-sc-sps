using Microsoft.EntityFrameworkCore;
using Poliza.Core.Enumerations;

namespace Poliza.Core.Interfaces
{
    public interface IUnitOfWorkFactory
    {
        void RegisterUnitOfWork<TDbContext>(UnitOfWorkType unitOfWorkType, Func<TDbContext> context) where TDbContext : DbContext;
        IUnitOfWork CreateUnitOfWork(UnitOfWorkType unitOfWorkType);
    }
}

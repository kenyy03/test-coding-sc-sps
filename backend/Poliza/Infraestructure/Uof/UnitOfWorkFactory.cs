using Microsoft.EntityFrameworkCore;
using Poliza.Core.Enumerations;
using Poliza.Core.Interfaces;

namespace Poliza.Infraestructure.Uof
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private Dictionary<UnitOfWorkType, IUnitOfWork> _unitOfWorks;
        private Dictionary<UnitOfWorkType, Func<DbContext>> _contexts;

        public UnitOfWorkFactory()
        {
            _unitOfWorks = new Dictionary<UnitOfWorkType, IUnitOfWork>();
            _contexts = new Dictionary<UnitOfWorkType, Func<DbContext>>();
        }

        public IUnitOfWork CreateUnitOfWork(UnitOfWorkType unitOfWorkType)
        {
            if (_unitOfWorks.ContainsKey(unitOfWorkType))
            {
                return _unitOfWorks[unitOfWorkType];
            }

            DbContext context = _contexts[unitOfWorkType]();
            UnitOfWork unitOfWork = new UnitOfWork(context);
            _unitOfWorks.Add(unitOfWorkType, unitOfWork);
            return unitOfWork;
        }

        public void RegisterUnitOfWork<TDbContext>(UnitOfWorkType unitOfWorkType, Func<TDbContext> context) where TDbContext : DbContext
        {
            _contexts.Add(unitOfWorkType, context);
        }
    }
}

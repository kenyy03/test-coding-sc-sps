using Poliza.Core.Abstractions;
using System.Data.Common;

namespace Poliza.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity;
        void Save();
        Task SaveAsync();
        void Commit();
        Task CommitAsync();
        void RollBack();
        void BeginTransaction();
        List<T> RawSqlQuery<T>(string query, Func<DbDataReader, T> map, int timeOut = 30, params object[] parameters) where T : class;
        void SetCommandTimeout(int seconds);
    }
}

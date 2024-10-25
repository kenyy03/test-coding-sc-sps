using Poliza.Core.Abstractions;

namespace Poliza.Core.Interfaces;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
    IEnumerable<TEntity> GetAll();
    IEnumerable<TEntity> GetFiltered(Func<TEntity, bool> predicate);
    IQueryable<TEntity> AsQueryable();
    Task<TEntity> FindByIdAsync(int id);
    Task<TEntity> FindByIdWithCollections(int id, params string[] includeProperties);
    Task<TEntity> AddAsync(TEntity entity);
    Task AddRangeAsync(params TEntity[] entities);
    Task Delete(int id);
    void Update(TEntity entity);
    void RemoveRange(params TEntity[] entities);
}

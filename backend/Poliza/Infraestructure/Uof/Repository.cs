using Microsoft.EntityFrameworkCore;
using Poliza.Core.Abstractions;
using Poliza.Core.Interfaces;

namespace Poliza.Infraestructure.Uof
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DbContext _context;
        private readonly DbSet<TEntity> _entities;

        public Repository(DbContext context)
        {
            _context = context;
            _entities = context.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            var entityAdded = await _entities.AddAsync(entity);
            return entityAdded.Entity;
        }

        public async Task AddRangeAsync(params TEntity[] entities)
        {
            await _entities.AddRangeAsync(entities);
        }

        public async Task Delete(int id)
        {
            var entity = await FindByIdAsync(id);
            if (entity is not null)
            {
                _entities.Remove(entity);
            }
        }

        public async Task<TEntity> FindByIdAsync(int id) => await _entities.FindAsync(id);
        public async Task<TEntity> FindByIdWithCollections(int id, params string[] includeProperties)
        {
            IQueryable<TEntity> queryable = _entities;
            foreach (var property in includeProperties)
            {
                queryable = queryable.Include(property);
            }

            return await queryable.FirstOrDefaultAsync(e => e.Codigo == id);
        }

        public IEnumerable<TEntity> GetAll() => _entities.AsEnumerable();

        public void Update(TEntity entity)
        {
            _entities.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public IEnumerable<TEntity> GetFiltered(Func<TEntity, bool> predicate)
        {
            return _entities.Where(predicate);
        }

        public IQueryable<TEntity> AsQueryable() => _entities;

        public void RemoveRange(params TEntity[] entities)
        {
            _entities.RemoveRange(entities);
        }
    }
}

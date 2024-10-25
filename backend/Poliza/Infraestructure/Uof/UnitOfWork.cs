using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Poliza.Core.Abstractions;
using Poliza.Core.Interfaces;
using System.Data;
using System.Data.Common;

namespace Poliza.Infraestructure.Uof
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private IDbContextTransaction? _transaction;

        public UnitOfWork(DbContext context)
        {
            _context = context;
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity
        {
            return new Repository<TEntity>(_context);
        }

        public void Save()
        {
            try
            {
                if (_transaction == null)
                {
                    BeginTransaction();
                    _context.SaveChanges();
                    Commit();
                    return;
                }
                _context.SaveChanges();
            }
            catch (Exception)
            {
                RollBack();
            }
        }

        public async Task SaveAsync()
        {
            try
            {
                if (_transaction == null)
                {
                    BeginTransaction();
                    await _context.SaveChangesAsync();
                    await CommitAsync();
                    return;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                RollBack();
            }
        }

        public void BeginTransaction()
        {
            _transaction ??= _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            if (_transaction != null)
            {
                _transaction.Commit();
                _transaction.Dispose();
                _transaction = null;
            }
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void RollBack()
        {
            if (_transaction != null)
            {
                _transaction.Rollback();
                _transaction.Dispose();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
        }

        public List<T> RawSqlQuery<T>(string query, Func<DbDataReader, T> map, int timeOut = 30, params object[] parameters) where T : class
        {
            using DbConnection connection = _context.Database.GetDbConnection();
            using DbCommand command = connection.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = query;
            command.CommandTimeout = timeOut;
            command.Parameters.AddRange(parameters);
            List<T> result = new();
            try
            {
                connection.Open();
                using DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);

                while (reader.Read())
                {
                    result.Add(map(reader));
                }
            }
            finally
            {
                command.Cancel();
                command.Dispose();
                connection.Close();
                connection.Dispose();
            }

            return result;
        }

        public void SetCommandTimeout(int seconds)
        {
            _context.Database.SetCommandTimeout(TimeSpan.FromSeconds(seconds));
        }
    }
}

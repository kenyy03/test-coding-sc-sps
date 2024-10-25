using Microsoft.EntityFrameworkCore;
using Poliza.Core.Entities;
using Poliza.Infraestructure.Contexts.Maps;
using PolizaEntity = Poliza.Core.Entities.Poliza;

namespace Poliza.Infraestructure.Contexts
{
    public class PolizaContext : DbContext
    {
        public PolizaContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modeBuilder)
        {
            modeBuilder.ApplyConfiguration(new TipoPersonaMap());
            modeBuilder.ApplyConfiguration(new ClienteMap());
            modeBuilder.ApplyConfiguration(new PolizaMap());
            base.OnModelCreating(modeBuilder);
        }

        public DbSet<TipoPersona> TiposPersonas { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<PolizaEntity> Polizas { get; set; }
    }
}

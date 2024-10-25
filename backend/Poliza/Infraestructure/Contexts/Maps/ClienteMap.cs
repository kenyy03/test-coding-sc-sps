using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Poliza.Core.Entities;
using Poliza.Infraestructure.Abstractions;

namespace Poliza.Infraestructure.Contexts.Maps
{
    public class ClienteMap : BaseEntityTypeConfiguration<Cliente>
    {
        public override void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("Cliente");
            builder.HasKey(k => k.Codigo);

            builder.Property(p => p.Codigo).HasColumnName("Codigo").HasColumnType("int");
            builder.Property(p => p.Nombre).HasColumnName("Nombre").HasColumnType("varchar").HasMaxLength(150);
            builder.Property(p => p.Identidad).HasColumnName("Identidad").HasColumnType("varchar").HasMaxLength(13);
            builder.Property(p => p.Rtn).HasColumnName("Rtn").HasColumnType("varchar").HasMaxLength(20);
            builder.Property(p => p.Sexo).HasColumnName("Sexo").HasColumnType("varchar").HasMaxLength(10);
            builder.Property(p => p.TipoPersonaId).HasColumnName("TipoPersonaId").HasColumnType("int");
            builder.Property(p => p.FechaNacimiento).HasColumnName("FechaNacimiento").HasColumnType("datetime");

            builder.HasOne(n => n.TipoPersona).WithMany(m => m.Clientes).HasForeignKey(fk => fk.TipoPersonaId);
            base.Configure(builder);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Poliza.Core.Interfaces;

namespace Poliza.Infraestructure.Abstractions
{
    public abstract class BaseEntityTypeConfiguration<T> : IEntityTypeConfiguration<T> where T : class, IAuditableEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.Property(p => p.UsuarioCreacionId).HasColumnName("UsuarioCreacionId").HasColumnType("int");
            builder.Property(p => p.UsuarioModificacionId).HasColumnName("UsuarioModificacionId").HasColumnType("int");
            builder.Property(p => p.FechaCreacion).HasColumnName("FechaCreacion").HasColumnType("datetime");
            builder.Property(p => p.FechaModificacion).HasColumnName("FechaModificacion").HasColumnType("datetime");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Poliza.Core.Entities;
using Poliza.Infraestructure.Abstractions;

namespace Poliza.Infraestructure.Contexts.Maps
{
    public class TipoPersonaMap : BaseEntityTypeConfiguration<TipoPersona>
    {
        public override void Configure(EntityTypeBuilder<TipoPersona> builder)
        {
            builder.ToTable("TipoPersona");
            builder.HasKey(k => k.Codigo);

            builder.Property(p => p.Codigo).HasColumnName("Codigo").HasColumnType("int");
            builder.Property(p => p.Descripcion).HasColumnName("Descripcion").HasColumnType("varchar");
            base.Configure(builder);
        }
    }
}

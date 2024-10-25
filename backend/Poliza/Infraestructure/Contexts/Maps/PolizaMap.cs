using PolizaEntity = Poliza.Core.Entities.Poliza;
using Poliza.Infraestructure.Abstractions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Poliza.Infraestructure.Contexts.Maps
{
    public class PolizaMap : BaseEntityTypeConfiguration<PolizaEntity>
    {
        public override void Configure(EntityTypeBuilder<PolizaEntity> builder)
        {
            builder.ToTable("Poliza");
            builder.HasKey(k => k.Codigo);

            builder.Property(p => p.Codigo).HasColumnName("PolizaId").HasColumnType("int");
            builder.Property(p => p.CodigoCliente).HasColumnName("CodigoCliente").HasColumnType("int");
            builder.Property(p => p.SumaAsegurada).HasColumnName("SumaAsegurada").HasColumnType("decimal");
            builder.Property(p => p.PrimaSeguro).HasColumnName("PrimaSeguro").HasColumnType("decimal");
            builder.Property(p => p.Moneda).HasColumnName("Moneda").HasColumnType("varchar").HasMaxLength(3);
            builder.Property(p => p.FactorDeCambio).HasColumnName("FactorDeCambio").HasColumnType("decimal");

            builder.HasOne(n => n.Cliente).WithMany(m => m.Polizas).HasForeignKey(fk => fk.CodigoCliente);
            base.Configure(builder);
        }
    }
}

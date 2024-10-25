using Poliza.Core.Abstractions;

namespace Poliza.Core.Dtos
{
    public class PolizaDto : BaseDto
    {
        public int CodigoCliente { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public decimal SumaAsegurada { get; set; }
        public decimal PrimaSeguro { get; set; }
        public string Moneda { get; set; } = string.Empty;
        public decimal FactorDeCambio { get; set; }
    }
}

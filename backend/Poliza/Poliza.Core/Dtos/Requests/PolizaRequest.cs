using Poliza.Core.Abstractions;

namespace Poliza.Core.Dtos.Requests
{
    public class PolizaRequest : BaseRequest
    {
        public int CodigoCliente { get; set; }
        public decimal SumaAsegurada { get; set; }
        public decimal PrimaSeguro { get; set; }
        public string Moneda { get; set; } = string.Empty;
        public decimal FactorDeCambio { get; set; }
    }
}

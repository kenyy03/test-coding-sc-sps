namespace Poliza.Core.Dtos
{
    public class ReportePolizaDto
    {
        public int Codigo { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public string TipoPersonaDescripcion { get; set; } = string.Empty;
        public decimal SumaAsegurada { get; set; }
        public decimal PrimaSeguro { get; set; }
        public string Moneda { get; set; } = string.Empty;
    }
}

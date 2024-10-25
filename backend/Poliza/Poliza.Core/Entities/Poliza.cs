using Poliza.Core.Abstractions;
using Poliza.Core.Interfaces;

namespace Poliza.Core.Entities
{
    public class Poliza : BaseEntity, IAuditableEntity
    {
        public int CodigoCliente { get; set; }
        public decimal SumaAsegurada { get; set; }
        public decimal PrimaSeguro { get; set; }
        public string Moneda { get; set; } = string.Empty;
        public decimal FactorDeCambio { get; set; }

        public int UsuarioCreacionId { get; set; }
        public int? UsuarioModificacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public virtual Cliente? Cliente { get; set; }

        public bool EsValido(out string mensajeError)
        {
            if (!double.TryParse(SumaAsegurada.ToString(), out double _))
            {
                mensajeError = $"{nameof(SumaAsegurada)} debe ser numerico";
                return false;
            }

            if (!double.TryParse(PrimaSeguro.ToString(), out double _))
            {
                mensajeError = $"{nameof(PrimaSeguro)} debe ser numerico";
                return false;
            }

            mensajeError = string.Empty;
            return true;
        }
    }
}

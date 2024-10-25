using Poliza.Core.Abstractions;
using Poliza.Core.Interfaces;

namespace Poliza.Core.Entities
{
    public class TipoPersona : BaseEntity, IAuditableEntity
    {
        public TipoPersona()
        {
            Clientes = [];
        }
        public string Descripcion { get; set; } = string.Empty;

        public int UsuarioCreacionId { get; set; }
        public int? UsuarioModificacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public IList<Cliente> Clientes { get; set; }
    }
}

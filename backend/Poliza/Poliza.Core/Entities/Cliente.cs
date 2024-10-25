using Poliza.Core.Abstractions;
using Poliza.Core.Interfaces;

namespace Poliza.Core.Entities
{
    public class Cliente : BaseEntity, IAuditableEntity
    {
        public Cliente()
        {
            Polizas = [];
        }
        public string Nombre { get; set; } = string.Empty;
        public string Identidad { get; set; } = string.Empty;
        public string Rtn { get; set; } = string.Empty;
        public string Sexo { get; set; } = string.Empty;
        public int TipoPersonaId { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public int UsuarioCreacionId { get; set; }
        public int? UsuarioModificacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }

        public virtual TipoPersona? TipoPersona { get; set; }
        public IList<Poliza> Polizas { get; set; }
    }
}

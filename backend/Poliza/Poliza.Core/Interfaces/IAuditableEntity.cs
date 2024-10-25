namespace Poliza.Core.Interfaces
{
    public interface IAuditableEntity
    {
        int UsuarioCreacionId { get; set; }
        int? UsuarioModificacionId { get; set; }
        DateTime FechaCreacion { get; set; }
        DateTime? FechaModificacion { get; set; }
    }
}

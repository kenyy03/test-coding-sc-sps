namespace Poliza.Core.Abstractions
{
    public abstract class BaseDto
    {
        public int Codigo { get; set; }
        public int UsuarioCreacionId { get; set; }
        public int? UsuarioModificacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}

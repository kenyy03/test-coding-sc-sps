using Poliza.Core.Abstractions;

namespace Poliza.Core.Dtos.Requests
{
    public class ClienteRequest : BaseRequest
    {
        public string Nombre { get; set; } = string.Empty;
        public string Identidad { get; set; } = string.Empty;
        public string Rtn { get; set; } = string.Empty;
        public string Sexo { get; set; } = string.Empty;
        public int TipoPersonaId { get; set; }
        public string TipoPersonaDescripcion { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
    }
}

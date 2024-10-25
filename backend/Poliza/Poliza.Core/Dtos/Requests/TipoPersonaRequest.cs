using Poliza.Core.Abstractions;

namespace Poliza.Core.Dtos.Requests
{
    public class TipoPersonaRequest : BaseRequest
    {
        public string Descripcion { get; set; } = string.Empty;
    }
}

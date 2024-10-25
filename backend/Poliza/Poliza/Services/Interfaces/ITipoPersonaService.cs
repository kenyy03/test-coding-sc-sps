using Poliza.API.Response;
using Poliza.Core.Dtos;
using Poliza.Core.Dtos.Requests;

namespace Poliza.API.Services.Interfaces
{
    public interface ITipoPersonaService
    {
        Task<ApiResponse<TipoPersonaDto>> CrearTipoPersona(TipoPersonaRequest peticion);
        Task<ApiResponse<List<TipoPersonaDto>>> ObtenerTiposPersonas();
        Task<ApiResponse<TipoPersonaDto>> ModificarTipoPersona(TipoPersonaRequest peticion);
        Task<ApiResponse<int>> EliminarTipoPersona(int id);
    }
}

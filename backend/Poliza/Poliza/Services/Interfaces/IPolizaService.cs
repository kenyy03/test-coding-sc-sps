using Poliza.API.Response;
using Poliza.Core.Dtos.Requests;
using Poliza.Core.Dtos;

namespace Poliza.API.Services.Interfaces
{
    public interface IPolizaService
    {
        Task<ApiResponse<PolizaDto>> CrearPoliza(PolizaRequest peticion);
        Task<ApiResponse<List<PolizaDto>>> ObtenerPolizas();
        ApiResponse<PaginatedList<ReportePolizaDto>> GenerarReportePolizas(PolizaRequest peticion);
        Task<ApiResponse<PolizaDto>> ModificarPoliza(PolizaRequest peticion);
        Task<ApiResponse<int>> EliminarPoliza(int id);
    }
}

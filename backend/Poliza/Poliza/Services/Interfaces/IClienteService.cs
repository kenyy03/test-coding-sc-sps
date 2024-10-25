using Poliza.API.Response;
using Poliza.Core.Dtos.Requests;
using Poliza.Core.Dtos;

namespace Poliza.API.Services.Interfaces
{
    public interface IClienteService
    {
        Task<ApiResponse<ClienteDto>> CrearCliente(ClienteRequest peticion);
        Task<ApiResponse<List<ClienteDto>>> ObtenerClientes();
        Task<ApiResponse<ClienteDto>> ModificarCliente(ClienteRequest peticion);
        Task<ApiResponse<int>> EliminarCliente(int id);
    }
}

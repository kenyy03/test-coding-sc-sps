using Microsoft.AspNetCore.Mvc;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Dtos.Requests;

namespace Poliza.API.Controllers
{
    [Route("api/cliente")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet("obtener")]
        public async Task<IActionResult> ObtenerClientes()
        {
            var response = await _clienteService.ObtenerClientes();
            return Ok(response);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearCliente([FromBody] ClienteRequest peticion)
        {
            var response = await _clienteService.CrearCliente(peticion);
            return Ok(response);
        }

        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarClientes([FromBody] ClienteRequest peticion)
        {
            var response = await _clienteService.ModificarCliente(peticion);
            return Ok(response);
        }

        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarCliente([FromQuery] int id)
        {
            var response = await _clienteService.EliminarCliente(id);
            return Ok(response);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Dtos.Requests;

namespace Poliza.API.Controllers
{
    [Route("api/tipo-persona")]
    [ApiController]
    public class TipoPersonaController : ControllerBase
    {
        private readonly ITipoPersonaService _tipoPersonaService;
        public TipoPersonaController(ITipoPersonaService tipoPersonaService)
        {
            _tipoPersonaService = tipoPersonaService;
        }

        [HttpGet("obtener")]
        public async Task<IActionResult> ObtenerTiposPersonas()
        {
            var response = await _tipoPersonaService.ObtenerTiposPersonas();
            return Ok(response);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearTipoPersona([FromBody] TipoPersonaRequest peticion)
        {
            var response = await _tipoPersonaService.CrearTipoPersona(peticion);
            return Ok(response);
        }

        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarTipoPersona([FromBody] TipoPersonaRequest peticion)
        {
            var response = await _tipoPersonaService.ModificarTipoPersona(peticion);
            return Ok(response);
        }

        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarTipoPersona([FromQuery] int id)
        {
            var response = await _tipoPersonaService.EliminarTipoPersona(id);
            return Ok(response);
        }

    }
}

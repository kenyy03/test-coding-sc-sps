using Microsoft.AspNetCore.Mvc;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Dtos.Requests;

namespace Poliza.API.Controllers
{
    [Route("api/poliza")]
    [ApiController]
    public class PolizaController : ControllerBase
    {
        private readonly IPolizaService _polizaService;
        public PolizaController(IPolizaService polizaService)
        {
            _polizaService = polizaService;
        }

        [HttpGet("obtener")]
        public async Task<IActionResult> ObtenerPolizas()
        {
            var response = await _polizaService.ObtenerPolizas();
            return Ok(response);
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearPoliza([FromBody] PolizaRequest peticion)
        {
            var response = await _polizaService.CrearPoliza(peticion);
            return Ok(response);
        }

        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarPoliza([FromBody] PolizaRequest peticion)
        {
            var response = await _polizaService.ModificarPoliza(peticion);
            return Ok(response);
        }

        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarPoliza([FromQuery] int id)
        {
            var response = await _polizaService.EliminarPoliza(id);
            return Ok(response);
        }

        [HttpGet("generar-reporte")]
        public IActionResult GenerarReportePolizas([FromQuery] PolizaRequest peticion)
        {
            var response = _polizaService.GenerarReportePolizas(peticion);
            return Ok(response);
        }
    }
}

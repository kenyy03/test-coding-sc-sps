using AutoMapper;
using Poliza.API.Response;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Dtos;
using Poliza.Core.Dtos.Requests;
using PolizaEntity = Poliza.Core.Entities.Poliza;
using Poliza.Core.Enumerations;
using Poliza.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Poliza.Core.Extensions;

namespace Poliza.API.Services
{
    public class PolizaService : IPolizaService
    {
        private readonly IUnitOfWork _uofSeguroContinental;
        private readonly IMapper _mapper;
        public PolizaService(IUnitOfWorkFactory uofFactory, IMapper mapper)
        {
            _uofSeguroContinental = uofFactory.CreateUnitOfWork(UnitOfWorkType.SeguroContinentalTestCoding);
            _mapper = mapper;
        }
        public async Task<ApiResponse<PolizaDto>> CrearPoliza(PolizaRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<PolizaDto>.Failure(message: "La peticion llego nula");

                var polizaPorCrear = _mapper.Map<PolizaEntity>(peticion);
                if (!polizaPorCrear.EsValido(out string mensajeError))
                {
                    return ApiResponse<PolizaDto>.Failure(message: mensajeError);
                }
                var polizaCreada = await _uofSeguroContinental.GetRepository<PolizaEntity>().AddAsync(polizaPorCrear);
                await _uofSeguroContinental.SaveAsync();

                return ApiResponse<PolizaDto>.Success(_mapper.Map<PolizaDto>(polizaCreada), message: "Se ha creado con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<PolizaDto>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<int>> EliminarPoliza(int id)
        {
            try
            {
                if (id < 1)
                    return ApiResponse<int>.Failure(message: "La peticion llego nula");

                await _uofSeguroContinental.GetRepository<PolizaEntity>()
                                           .Delete(id);

                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<int>.Success(data: id, message: "Se elimino con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<int>.Failure(message: ex.Message);
            }
        }

        public ApiResponse<PaginatedList<ReportePolizaDto>> GenerarReportePolizas(PolizaRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<PaginatedList<ReportePolizaDto>>.Failure(message: "La peticion llego null");
                
                var query = _uofSeguroContinental.GetRepository<PolizaEntity>()
                                                .AsQueryable()
                                                .AsNoTracking();

                bool esEnLempiras = !string.IsNullOrWhiteSpace(peticion.Moneda) 
                    && peticion.Moneda.Equals(nameof(Moneda.LPS), StringComparison.OrdinalIgnoreCase)
                    && !peticion.Moneda.Contains("Ambos");
                bool esEnDolares = !string.IsNullOrWhiteSpace(peticion.Moneda) 
                    && peticion.Moneda.Equals(nameof(Moneda.DLS), StringComparison.OrdinalIgnoreCase)
                    && !peticion.Moneda.Contains("Ambos");
                if (esEnLempiras || esEnDolares)
                {
                    query = query.Where(x => x.Moneda.ToUpper() == peticion.Moneda.ToUpper());
                }

                int pagina = peticion.Pagina < 1 ? 1 : peticion.Pagina;
                int tamanioPagina = peticion.TamanioPagina < 1 ? 10 : peticion.TamanioPagina;
                
                var reporte =  query.ProjectTo<ReportePolizaDto>(_mapper.ConfigurationProvider)
                                    .OrderBy(o => o.NombreCliente)
                                    .AsPaginatedList(pagina, tamanioPagina);

                return ApiResponse<PaginatedList<ReportePolizaDto>>.Success(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<PaginatedList<ReportePolizaDto>>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<PolizaDto>> ModificarPoliza(PolizaRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<PolizaDto>.Failure(message: "La peticion llego nula");

                var poliza = await _uofSeguroContinental.GetRepository<PolizaEntity>()
                                                        .FindByIdAsync(peticion.Codigo);

                if (poliza is null)
                    return ApiResponse<PolizaDto>.NotFound(message: $"No se encontro el registro con id: {peticion.Codigo}");

                poliza.CodigoCliente = peticion.CodigoCliente;
                poliza.SumaAsegurada = peticion.SumaAsegurada;
                poliza.PrimaSeguro = peticion.PrimaSeguro;
                poliza.Moneda = peticion.Moneda;
                poliza.FactorDeCambio = peticion.FactorDeCambio;
                poliza.FechaModificacion = DateTime.Now;
                poliza.UsuarioModificacionId = 1;
                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<PolizaDto>.Success(data: _mapper.Map<PolizaDto>(poliza), message: "Se ha actualizado con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<PolizaDto>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<List<PolizaDto>>> ObtenerPolizas()
        {
            try
            {
                var polizas = await _uofSeguroContinental.GetRepository<PolizaEntity>()
                                                           .AsQueryable()
                                                           .AsNoTracking()
                                                           .ProjectTo<PolizaDto>(_mapper.ConfigurationProvider)
                                                           .ToListAsync();

                return ApiResponse<List<PolizaDto>>.Success(polizas);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<PolizaDto>>.Failure(message: ex.Message);
            }
        }
    }
}

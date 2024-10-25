using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Poliza.API.Response;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Dtos;
using Poliza.Core.Dtos.Requests;
using Poliza.Core.Entities;
using Poliza.Core.Enumerations;
using Poliza.Core.Interfaces;

namespace Poliza.API.Services
{
    public class TipoPersonaService : ITipoPersonaService
    {
        private readonly IUnitOfWork _uofSeguroContinental;
        private readonly IMapper _mapper;
        public TipoPersonaService(IUnitOfWorkFactory unitOfWorkFactory, IMapper mapper)
        {
            _uofSeguroContinental = unitOfWorkFactory.CreateUnitOfWork(UnitOfWorkType.SeguroContinentalTestCoding);
            _mapper = mapper;
        }

        public async Task<ApiResponse<TipoPersonaDto>> CrearTipoPersona(TipoPersonaRequest peticion)
        {
            try
            {
                var tipoPersonaPorCrear = _mapper.Map<TipoPersona>(peticion);
                var tipoPersonaCreada = await _uofSeguroContinental.GetRepository<TipoPersona>()
                                                                   .AddAsync(tipoPersonaPorCrear);

                await _uofSeguroContinental.SaveAsync();

                var tipoPersonaPorRetornar = _mapper.Map<TipoPersonaDto>(tipoPersonaCreada);
                return ApiResponse<TipoPersonaDto>.Success(data: tipoPersonaPorRetornar, message: "Se ha creado el registro con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<TipoPersonaDto>.Failure(message: ex.Message);
            }

        }

        public async Task<ApiResponse<int>> EliminarTipoPersona(int id)
        {
            try
            {
                if (id < 1)
                    return ApiResponse<int>.Failure(message: "La peticion llego nula");

                await _uofSeguroContinental.GetRepository<TipoPersona>()
                                           .Delete(id);

                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<int>.Success(data: id, message: "Se elimino con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<int>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<TipoPersonaDto>> ModificarTipoPersona(TipoPersonaRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<TipoPersonaDto>.Failure(message: "La peticion llego nula");

                var tipoPersona = await _uofSeguroContinental.GetRepository<TipoPersona>()
                                                             .FindByIdAsync(peticion.Codigo);

                if(tipoPersona is null)
                    return ApiResponse<TipoPersonaDto>.NotFound(message: $"No se encontro el registro con id: {peticion.Codigo}");

                tipoPersona.Descripcion = peticion.Descripcion;
                tipoPersona.UsuarioModificacionId = 1;
                tipoPersona.FechaModificacion = DateTime.Now;
                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<TipoPersonaDto>.Success(data: _mapper.Map<TipoPersonaDto>(tipoPersona), message:"Se ha actualizado con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<TipoPersonaDto>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<List<TipoPersonaDto>>> ObtenerTiposPersonas()
        {
            try
            {
                var tiposPersona = await _uofSeguroContinental.GetRepository<TipoPersona>()
                                                              .AsQueryable()
                                                              .AsNoTracking()
                                                              .ProjectTo<TipoPersonaDto>(_mapper.ConfigurationProvider)
                                                              .ToListAsync();

                return ApiResponse<List<TipoPersonaDto>>.Success(tiposPersona, message: "Se obtuvieron los datos con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<List<TipoPersonaDto>>.Failure(message: ex.Message);
            }
        }
    }
}

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
    public class ClienteService : IClienteService
    {
        private readonly IUnitOfWork _uofSeguroContinental;
        private readonly IMapper _mapper;
        public ClienteService(IUnitOfWorkFactory uofFactory, IMapper mapper)
        {
            _uofSeguroContinental = uofFactory.CreateUnitOfWork(UnitOfWorkType.SeguroContinentalTestCoding);
            _mapper = mapper;
        }
        public async Task<ApiResponse<ClienteDto>> CrearCliente(ClienteRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<ClienteDto>.Failure(message: "La peticion llego nula");

                bool esClienteYaExistente = await ValidarEsClienteYaExistente(peticion);
                if (esClienteYaExistente)
                    return ApiResponse<ClienteDto>.Failure(message: "No se puede crear el cliente porque ya existe. Favor validar.");

                var clientePorCrear = _mapper.Map<Cliente>(peticion);
                var clienteCreado = await _uofSeguroContinental.GetRepository<Cliente>().AddAsync(clientePorCrear);
                await _uofSeguroContinental.SaveAsync();

                return ApiResponse<ClienteDto>.Success(_mapper.Map<ClienteDto>(clienteCreado), message: "Se ha creado con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<ClienteDto>.Failure(message: ex.Message);
            }
        }

        private async Task<bool> ValidarEsClienteYaExistente(ClienteRequest peticion)
        {
            if (peticion.TipoPersonaDescripcion.Equals(nameof(TipoPersonaEnum.Juridica)))
            {
                return await _uofSeguroContinental.GetRepository<Cliente>()
                                                .AsQueryable()
                                                .AsNoTracking()
                                                .AnyAsync(a => a.Rtn.ToUpper() == peticion.Rtn);
            }

            return await _uofSeguroContinental.GetRepository<Cliente>()
                                                .AsQueryable()
                                                .AsNoTracking()
                                                .AnyAsync(a => a.Identidad.ToUpper() == peticion.Identidad);
        }

        public async Task<ApiResponse<int>> EliminarCliente(int id)
        {
            try
            {
                if (id < 1)
                    return ApiResponse<int>.Failure(message: "La peticion llego nula");

                await _uofSeguroContinental.GetRepository<Cliente>()
                                           .Delete(id);

                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<int>.Success(data: id, message: "Se elimino con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<int>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<ClienteDto>> ModificarCliente(ClienteRequest peticion)
        {
            try
            {
                if (peticion is null)
                    return ApiResponse<ClienteDto>.Failure(message: "La peticion llego nula");

                var cliente = await _uofSeguroContinental.GetRepository<Cliente>()
                                                             .FindByIdAsync(peticion.Codigo);

                if (cliente is null)
                    return ApiResponse<ClienteDto>.NotFound(message: $"No se encontro el registro con id: {peticion.Codigo}");

                cliente.Rtn = peticion.Rtn;
                cliente.Identidad = peticion.Identidad;
                cliente.Sexo = peticion.Sexo;
                cliente.Nombre = peticion.Nombre;
                cliente.TipoPersonaId = peticion.TipoPersonaId;
                cliente.FechaNacimiento = peticion.FechaNacimiento;
                cliente.FechaModificacion = DateTime.Now;
                cliente.UsuarioModificacionId = 1;
                await _uofSeguroContinental.SaveAsync();
                return ApiResponse<ClienteDto>.Success(data: _mapper.Map<ClienteDto>(cliente), message: "Se ha actualizado con exito");
            }
            catch (Exception ex)
            {
                return ApiResponse<ClienteDto>.Failure(message: ex.Message);
            }
        }

        public async Task<ApiResponse<List<ClienteDto>>> ObtenerClientes()
        {
            try
            {
                var clientes = await _uofSeguroContinental.GetRepository<Cliente>()
                                                            .AsQueryable()
                                                            .AsNoTracking()
                                                            .Include(i => i.TipoPersona)
                                                            .ProjectTo<ClienteDto>(_mapper.ConfigurationProvider)
                                                            .ToListAsync();

                return ApiResponse<List<ClienteDto>>.Success(clientes);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<ClienteDto>>.Failure(message: ex.Message);
            }
        }
    }
}

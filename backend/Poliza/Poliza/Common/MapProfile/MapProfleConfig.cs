using AutoMapper;
using Poliza.Core.Dtos;
using Poliza.Core.Dtos.Requests;
using Poliza.Core.Entities;
using PolizaEntity = Poliza.Core.Entities.Poliza;

namespace Poliza.Core.MapProfile
{
    public class MapProfleConfig : Profile
    {
        public MapProfleConfig()
        {
            CreateMap<TipoPersona, TipoPersonaDto>();
            CreateMap<TipoPersonaDto, TipoPersona>();
            CreateMap<TipoPersonaRequest, TipoPersona>()
                .ForMember(f => f.UsuarioCreacionId, opt => opt.MapFrom(src => 1))
                .ForMember(f => f.FechaCreacion, opt => opt.MapFrom(src => DateTime.Now));


            CreateMap<ClienteRequest, Cliente>()
                .ForMember(f => f.UsuarioCreacionId, opt => opt.MapFrom(src => 1))
                .ForMember(f => f.FechaCreacion, opt => opt.MapFrom(src => DateTime.Now));
            CreateMap<Cliente, ClienteDto>()
                .ForMember(f => f.TipoPersonaDescripcion, opt => opt.MapFrom(src => src.TipoPersona != null ? src.TipoPersona.Descripcion : string.Empty));
            CreateMap<ClienteDto, Cliente>();

            CreateMap<PolizaRequest, PolizaEntity>()
                .ForMember(f => f.UsuarioCreacionId, opt => opt.MapFrom(src => 1))
                .ForMember(f => f.FechaCreacion, opt => opt.MapFrom(src => DateTime.Now));
            CreateMap<PolizaEntity, PolizaDto>()
                .ForMember(f => f.NombreCliente, opt => opt.MapFrom(src => src.Cliente != null ? src.Cliente.Nombre : string.Empty));
            CreateMap<PolizaDto, PolizaEntity>();
            CreateMap<PolizaEntity, ReportePolizaDto>()
                .ForMember(f => f.NombreCliente, opt => opt.MapFrom(src => src.Cliente != null ? src.Cliente.Nombre : string.Empty))
                .ForMember(f => f.TipoPersonaDescripcion, opt => opt.MapFrom(src => src.Cliente!.TipoPersona != null ? src.Cliente.TipoPersona.Descripcion : string.Empty));
        }
    }
}

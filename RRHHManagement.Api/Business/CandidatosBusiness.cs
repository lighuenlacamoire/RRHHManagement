using AutoMapper;
using RRHHManagement.Api.Context;
using RRHHManagement.Api.Logger;
using RRHHManagement.Api.Models.DTO;
using RRHHManagement.Api.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRHHManagement.Api.Business
{
    public interface ICandidatosBusiness
    {
        IEnumerable<CandidatoDto> GetCandidatos();
        CandidatoDto GetById(int Id);
        CandidatoDto Post(CandidatoDto candidatoDto);
        CandidatoDto Update(CandidatoDto candidatoDto);
        CandidatoDto DeleteById(int Id);
    }

    public class CandidatosBusiness : ICandidatosBusiness
    {
        #region Dependencies
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;
        private readonly SQLDbContext _context;
        #endregion

        #region Constructor
        public CandidatosBusiness(
            ILoggerManager loggerManager,
            SQLDbContext context)
        {
            this._logger = loggerManager;
            this._context = context;

            #region Mapping
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                #region Candidatos
                cfg.CreateMap<Candidato, CandidatoDto>()
                .ForMember(
                    dest => dest.Id,
                    src => src.MapFrom(x => x.Id))
                .ForMember(
                    dest => dest.Nombre,
                    src => src.MapFrom(x => x.Nombre))
                .ForMember(
                    dest => dest.Apellido,
                    src => src.MapFrom(x => x.Apellido))
                .ForMember(
                    dest => dest.FechaNacimiento,
                    src => src.MapFrom(x => x.FechaNacimiento))
                .ForMember(
                    dest => dest.Email,
                    src => src.MapFrom(x => x.Email))
                .ForMember(
                    dest => dest.Telefono,
                    src => src.MapFrom(x => x.Telefono))
                .ForMember(
                    dest => dest.CV,
                    src => src.MapFrom(x => x.CV))
                .ReverseMap();
                #endregion

                #region Empleos
                cfg.CreateMap<Empleo, EmpleoDto>()
                .ForMember(
                    dest => dest.Id,
                    src => src.MapFrom(x => x.Id))
                .ForMember(
                    dest => dest.RazonSocial,
                    src => src.MapFrom(x => x.RazonSocial))
                .ForMember(
                    dest => dest.Periodo,
                    src => src.MapFrom(x => x.Periodo))
                .ReverseMap();
                #endregion
            });
            _mapper = config.CreateMapper();
            #endregion

        }
        #endregion

        #region Metodos
        /// <summary>
        /// Devuelve el listado de Candidatos
        /// </summary>
        /// <remarks>
        /// GET Listado de Candidatos
        /// </remarks>
        /// <returns>Listado de Candidatos</returns>
        public IEnumerable<CandidatoDto> GetCandidatos()
        {
            try
            {
                var query = _context.Candidatos;
                var list = _mapper.Map<IEnumerable<CandidatoDto>>(query);

                if (list == null || list.Count() == 0)
                {
                    _logger.LogWarn("No se han encontrado candidatos");
                }

                return list;
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló al consultar los candidatos");
                throw;
            }
        }

        /// <summary>
        /// Obtiene un Candidato filtrando por Id
        /// </summary>
        /// <param name="id">Id del Candidato</param>
        /// <returns></returns>
        public CandidatoDto GetById(int id)
        {
            try
            {
                var query = _context.Candidatos.FirstOrDefault(x => x.Id == id);

                return _mapper.Map<CandidatoDto>(query);
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló al consultar por el candidato Id "+ id);
                throw;
            }
        }

        /// <summary>
        /// Creacion Candidato
        /// </summary>
        /// <remarks>
        /// POST Creacion Candidato
        /// </remarks>
        /// <param name="candidato">Candidato</param>
        /// <returns></returns>
        public CandidatoDto Post(CandidatoDto candidato)
        {
            try
            {
                var entity = _mapper.Map<Candidato>(candidato);

                _context.Candidatos.Add(entity);
                _context.SaveChanges();
                _logger.LogInfo(string.Format(@"Se ha creado al candidato {0} {1}, con el Id {2}",candidato.Nombre,candidato.Apellido,candidato.Id));
                return _mapper.Map<CandidatoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(string.Format(@"Falló la creacion del candidato {0} {1}", candidato.Nombre, candidato.Apellido));
                throw;
            }
        }

        /// <summary>
        /// Actualizacion de Candidato
        /// </summary>
        /// <remarks>
        /// PUT Actualizacion de Candidato
        /// </remarks>
        /// <param name="candidato">Candidato</param>
        /// <returns></returns>
        public CandidatoDto Update(CandidatoDto candidato)
        {
            try
            {
                var entity = _context.Candidatos.FirstOrDefault(x => x.Id == candidato.Id);

                if (entity == null)
                {
                    string message = "No se pudo encontrar al candidato de Id " + candidato.Id;
                    _logger.LogWarn(message);
                    throw new Exception(message);
                }

                entity.Nombre = !string.IsNullOrEmpty(candidato.Nombre) ? candidato.Nombre : entity.Nombre;
                entity.Apellido = !string.IsNullOrEmpty(candidato.Apellido) ? candidato.Apellido : entity.Apellido;
                entity.Email = !string.IsNullOrEmpty(candidato.Email) ? candidato.Email : entity.Email;
                entity.Telefono = !string.IsNullOrEmpty(candidato.Telefono) ? candidato.Telefono : entity.Telefono;

                _context.SaveChanges();
                _logger.LogInfo(string.Format(@"Se ha actualizado al candidato {0} {1}, con el Id {2}", entity.Nombre, entity.Apellido, entity.Id));
                return _mapper.Map<CandidatoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(string.Format(@"Falló la actualizacion del candidato {0} {1}", candidato.Nombre, candidato.Apellido));
                throw;
            }
        }

        /// <summary>
        /// Borrado de Candidato
        /// </summary>
        /// <remarks>
        /// DELETE Borrado de Candidato
        /// </remarks>
        /// <param name="id">Id del Candidato</param>
        /// <returns></returns>
        public CandidatoDto DeleteById(int id)
        {
            try
            {
                var entity = _context.Candidatos.FirstOrDefault(x => x.Id == id);

                if(entity == null)
                {
                    string message = "No se pudo encontrar al candidato de Id " + id;
                    _logger.LogWarn(message);
                    throw new Exception(message);
                }
                _context.Candidatos.Remove(entity);
                _context.SaveChanges();
                _logger.LogInfo("Se ha borrado al candidato exitosamente");
                return _mapper.Map<CandidatoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló el borrado del candidato id "+id);
                _logger.LogError(ex.Message);
                throw;
            }
        }
        #endregion
    }
}

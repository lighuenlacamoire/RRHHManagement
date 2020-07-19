using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
    public interface IEmpleosBusiness
    {
        IEnumerable<EmpleoDto> GetEmpleos();
        EmpleoDto GetById(int Id);
        EmpleoDto Post(EmpleoDto empleoDto);
        EmpleoDto Update(EmpleoDto empleoDto);
        EmpleoDto DeleteById(int Id);
    }

    public class EmpleosBusiness : IEmpleosBusiness
    {
        #region Dependencies
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;
        private readonly SQLDbContext _context;
        #endregion

        #region Constructor
        public EmpleosBusiness(
            ILoggerManager loggerManager,
            SQLDbContext context)
        {
            this._logger = loggerManager;
            this._context = context;

            #region Mapping
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
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
                .ForMember<CandidatoDto>(
                    dest => dest.Candidato,
                    src => src.MapFrom<Candidato>(x => x.Candidato))
                .ReverseMap();
                #endregion

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
                .ForMember<List<EmpleoDto>>(
                    dest => dest.Empleos,
                    src => src.MapFrom<IEnumerable<Empleo>>(x => x.Empleos))
                .ReverseMap();
                #endregion
            });
            _mapper = config.CreateMapper();
            #endregion

        }
        #endregion

        #region Metodos
        /// <summary>
        /// Devuelve el listado de Empleos
        /// </summary>
        /// <remarks>
        /// GET Listado de Empleos
        /// </remarks>
        /// <returns>Listado de Empleos</returns>
        public IEnumerable<EmpleoDto> GetEmpleos()
        {
            try
            {
                var query = _context.Empleos
                .Include(o => o.Candidato)
                .AsNoTracking();

                var list = _mapper.Map<IEnumerable<EmpleoDto>>(query);

                if (list == null || list.Count() == 0)
                {
                    _logger.LogWarn("No se han encontrado empleos");
                }

                return list;
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló al consultar los empleos");
                throw;
            }
        }

        /// <summary>
        /// Obtiene un Empleo filtrando por Id
        /// </summary>
        /// <param name="id">Id del Empleo</param>
        /// <returns></returns>
        public EmpleoDto GetById(int id)
        {
            try
            {
                var query = _context.Empleos
                .Include(o => o.Candidato)
                .FirstOrDefault(x => x.Id == id);

                return _mapper.Map<EmpleoDto>(query);
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló al consultar por el empleo Id " + id);
                throw;
            }
        }

        /// <summary>
        /// Creacion de Empleo
        /// </summary>
        /// <remarks>
        /// POST Creacion de Empleo
        /// </remarks>
        /// <param name="empleo">Empleo</param>
        /// <returns></returns>
        public EmpleoDto Post(EmpleoDto empleo)
        {
            try
            {
                var entity = _mapper.Map<Empleo>(empleo);

                _context.Empleos.Add(entity);
                _context.SaveChanges();
                _logger.LogInfo(string.Format(@"Se ha creado al Empleo {0}, con el Id {1}", empleo.RazonSocial, empleo.Id));
                return _mapper.Map<EmpleoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(string.Format(@"Falló la creacion del empleo {0}", empleo.RazonSocial));
                throw;
            }
        }

        /// <summary>
        /// Actualizacion de Empleo
        /// </summary>
        /// <remarks>
        /// PUT Actualizacion de Empleo
        /// </remarks>
        /// <param name="empleo">Empleo</param>
        /// <returns></returns>
        public EmpleoDto Update(EmpleoDto empleo)
        {
            try
            {
                var entity = _context.Empleos.FirstOrDefault(x => x.Id == empleo.Id);

                if (entity == null)
                {
                    string message = "No se pudo encontrar al empleo de Id " + empleo.Id;
                    _logger.LogWarn(message);
                    throw new Exception(message);
                }

                entity.RazonSocial = !string.IsNullOrEmpty(empleo.RazonSocial) ? empleo.RazonSocial : entity.RazonSocial;
                entity.Candidato = empleo.Candidato != null && empleo.Candidato.Id > 0 ? _mapper.Map<Candidato>(empleo.Candidato) : entity.Candidato;

                _context.SaveChanges();
                _logger.LogInfo(string.Format(@"Se ha actualizado el empleo {0}, con el Id {1}", entity.RazonSocial, entity.Id));
                return _mapper.Map<EmpleoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(string.Format(@"Falló la actualizacion del empleo {0}", empleo.RazonSocial));
                throw;
            }
        }

        /// <summary>
        /// Borrado de Empleo
        /// </summary>
        /// <remarks>
        /// DELETE Borrado de Empleo
        /// </remarks>
        /// <param name="id">Id del Empleo</param>
        /// <returns></returns>
        public EmpleoDto DeleteById(int id)
        {
            try
            {
                var entity = _context.Empleos.FirstOrDefault(x => x.Id == id);

                if (entity == null)
                {
                    string message = "No se pudo encontrar el empleo de Id " + id;
                    _logger.LogWarn(message);
                    throw new Exception(message);
                }
                _context.Empleos.Remove(entity);
                _context.SaveChanges();
                _logger.LogInfo("Se ha borrado el empleo exitosamente");
                return _mapper.Map<EmpleoDto>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError("Falló el borrado del empleo id " + id);
                _logger.LogError(ex.Message);
                throw;
            }
        }
        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RRHHManagement.Api.Business;
using RRHHManagement.Api.Context;
using RRHHManagement.Api.Models.DTO;

namespace RRHHManagement.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatosController : ControllerBase
    {
        #region Dependencies
        private ICandidatosBusiness _candidatosBusiness;
        #endregion

        #region Constructor
        public CandidatosController(ICandidatosBusiness candidatosBusiness)
        {
            this._candidatosBusiness = candidatosBusiness;
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
        [HttpGet]
        public IEnumerable<CandidatoDto> Get()
        {
            return _candidatosBusiness.GetCandidatos();
        }

        /// <summary>
        /// Obtiene un Candidato filtrando por Id
        /// </summary>
        /// <param name="id">Id del Candidato</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public CandidatoDto Get(int id)
        {
            return _candidatosBusiness.GetById(id);
        }

        /// <summary>
        /// Creacion Candidato
        /// </summary>
        /// <remarks>
        /// POST Creacion Candidato
        /// </remarks>
        /// <param name="candidato">Candidato</param>
        /// <returns></returns>
        [HttpPost]
        public CandidatoDto Post([FromBody]CandidatoDto candidato)
        {
            return _candidatosBusiness.Post(candidato);
        }

        /// <summary>
        /// Actualizacion de Candidato
        /// </summary>
        /// <remarks>
        /// PUT Actualizacion de Candidato
        /// </remarks>
        /// <param name="candidato">Candidato</param>
        /// <returns></returns>
        [HttpPut]
        public CandidatoDto Put([FromBody]CandidatoDto candidato)
        {
            return _candidatosBusiness.Update(candidato);
        }

        /// <summary>
        /// Borrado de Candidato
        /// </summary>
        /// <remarks>
        /// DELETE Borrado de Candidato
        /// </remarks>
        /// <param name="id">Id del Candidato</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public CandidatoDto DeleteById(int id)
        {
            return _candidatosBusiness.DeleteById(id);
        }
        #endregion
    }
}

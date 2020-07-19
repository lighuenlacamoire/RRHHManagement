using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RRHHManagement.Api.Business;
using RRHHManagement.Api.Models.DTO;

namespace RRHHManagement.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleosController : ControllerBase
    {
        #region Dependencies
        private IEmpleosBusiness _empleosBusiness;
        #endregion

        #region Constructor
        public EmpleosController(IEmpleosBusiness empleosBusiness)
        {
            this._empleosBusiness = empleosBusiness;
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
        [HttpGet]
        public IEnumerable<EmpleoDto> Get()
        {
            return _empleosBusiness.GetEmpleos();
        }

        /// <summary>
        /// Obtiene un Empleo filtrando por Id
        /// </summary>
        /// <param name="id">Id del Empleo</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public EmpleoDto Get(int id)
        {
            return _empleosBusiness.GetById(id);
        }

        /// <summary>
        /// Creacion Empleo
        /// </summary>
        /// <remarks>
        /// POST Creacion Empleo
        /// </remarks>
        /// <param name="empleo">Empleo</param>
        /// <returns></returns>
        [HttpPost]
        public EmpleoDto Post([FromBody]EmpleoDto empleo)
        {
            return _empleosBusiness.Post(empleo);
        }

        /// <summary>
        /// Actualizacion del Empleo
        /// </summary>
        /// <remarks>
        /// PUT Actualizacion del Empleo
        /// </remarks>
        /// <param name="empleo">Empleo</param>
        /// <returns></returns>
        [HttpPut]
        public EmpleoDto Put([FromBody]EmpleoDto empleo)
        {
            return _empleosBusiness.Update(empleo);
        }

        /// <summary>
        /// Borrado de Empleo
        /// </summary>
        /// <remarks>
        /// DELETE Borrado de Empleo
        /// </remarks>
        /// <param name="id">Id del Empleo</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public EmpleoDto DeleteById(int id)
        {
            return _empleosBusiness.DeleteById(id);
        }
        #endregion
    }
}

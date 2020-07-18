using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRHHManagement.Api.Models.DTO
{
    public class CandidatoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateTimeOffset FechaNacimiento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public byte CV { get; set; }
    }
}

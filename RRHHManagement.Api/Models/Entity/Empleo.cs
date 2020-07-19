using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRHHManagement.Api.Models.Entity
{
    public class Empleo
    {
        public int Id { get; set; }
        public string RazonSocial { get; set; }
        public string Periodo { get; set; }
        public Candidato Candidato { get; set; } = null;
    }
}

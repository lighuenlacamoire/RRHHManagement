using Microsoft.EntityFrameworkCore;
using RRHHManagement.Api.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRHHManagement.Api.Context
{
    public class SQLDbContext : DbContext
    {
        public DbSet<Candidato> Candidatos { get; set; }
        public DbSet<Empleo> Empleos { get; set; }

        public SQLDbContext(DbContextOptions<SQLDbContext> options) : base(options)
        {
        }

    }
}

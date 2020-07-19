using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RRHHManagement.Web.Controllers
{
    public class CandidatosController : Controller
    {
        // GET: Candidatos
        public ActionResult Index()
        {
            return View();
        }
        
    }
}
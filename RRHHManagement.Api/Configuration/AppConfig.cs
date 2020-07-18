using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRHHManagement.Api.Configuration
{
    public sealed class AppConfig
    {
        public class SQLConnection
        {
            public string ConnectionString { get; set; }
        }
    }
}

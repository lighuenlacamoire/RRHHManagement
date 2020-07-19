using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using RRHHManagement.Api.Configuration;
using RRHHManagement.Api.Context;
using RRHHManagement.Api.Logger;
using RRHHManagement.Api.Business;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using NLog;

namespace RRHHManagement.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region Data Configuration
            services.AddMvc()
                .AddViewLocalization()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                 .AddJsonOptions(opt =>
                 {
                     //opt.SerializerSettings.Converters.Add(new BsonDocumentJsonConverter());
                     opt.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ssZ";
                     //opt.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                     opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                     opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                     opt.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                     opt.SerializerSettings.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;
                 });
            #endregion

            services.AddOptions();

            #region AppSettings Configuration
            services.Configure<AppConfig>(Configuration.GetSection(typeof(AppConfig).Name));

            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<AppConfig>>().Value);
            #endregion

            #region Logger
            services.AddSingleton<ILoggerManager, LoggerManager>();
            #endregion

            #region DbContext
            services.AddDbContext<SQLDbContext>(
                options => options.UseSqlServer(
                    Configuration["AppConfig:SQLConnection:ConnectionString"]
                    ));
            #endregion

            #region Services
            services.AddScoped<ICandidatosBusiness, CandidatosBusiness>();
            services.AddScoped<IEmpleosBusiness, EmpleosBusiness>();
            #endregion

            #region Swagger
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1",
                    new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "RRHH Api",
                        Description = "Api con Candidatos y Empleos",
                        Version = "v1",
                        Contact = new Microsoft.OpenApi.Models.OpenApiContact
                        {
                            Name = "RRHH Company",
                            Email = string.Empty,
                            Url = new Uri("https://x.com"),
                        },
                    });
                // XML Documentation
                try
                {
                    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                    options.IncludeXmlComments(xmlPath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            });
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            #region Swagger Enabled
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "RRHH Api");
            });
            #endregion

            app.UseMvc();
        }
    }
}

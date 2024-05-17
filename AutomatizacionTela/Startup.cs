using AutomatizacionTela.Context;
using AutomatizacionTela.Models.Interfaces;
using AutomatizacionTela.Service.DapperService;
using AutomatizacionTela.Service.Interface;
using AutomatizacionTela.Service.SingnalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AutomatizacionTela
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200").AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });
            services.AddControllersWithViews();
            services.AddSignalR();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<AppContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("Dedalo2008"))
            );

            services.AddDbContext<AppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Dedalo"))
            );

            services.AddDbContext<AppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConsultasUnoeeE"))
            );

            services.AddDbContext<AppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConsultasUnoeeC"))
            );

            services.AddDbContext<AppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ConsultasIcg"))
            );

            services.AddScoped<IDapperDedalo2008, DapperDedalo2008>();

            services.AddScoped<IDapperDedalo, Services.DapperServices.DapperDedalo>();

            services.AddScoped<IDapperConsultasIcg, Services.DapperServices.DapperConsultasIcg>();

            services.AddScoped<IDapperConsultasUnoeeC, Services.DapperServices.DapperConsultasUnoeeC>();

            services.AddScoped<IDapperConsultasUnoeeE, Services.DapperServices.DapperConsultasUnoeeE>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseCors("AllowOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationHub>("/notificationHub");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}

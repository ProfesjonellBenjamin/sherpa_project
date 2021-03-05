using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SherpaPathApi.Models;
using SherpaPathApi.Services;
using Microsoft.Extensions.Options;

namespace SherpaPathApi
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

            services.AddCors(
                options => { 
                    options.AddPolicy("AllowAll",
                        builder => builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin()
                    );
                }
            );
            
            services.AddControllers();

            services.Configure<SherpaPathDatabaseSettings>(
                Configuration.GetSection( nameof(SherpaPathDatabaseSettings) )
            );

            services.AddSingleton<ISherpaPathDatabaseSettings>(
                sp => sp.GetRequiredService<IOptions<SherpaPathDatabaseSettings>>().Value
            );
            
            //services.AddSingleton<CharactersService>();

            services.AddSingleton<PathsService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseStaticFiles();
 
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

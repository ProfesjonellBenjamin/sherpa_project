using System;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SherpaPathApi.Models;
using SherpaPathApi.Services;
using Microsoft.Extensions.Options;
using SherpaPathApi.Policy;

namespace SherpaPathApi
{
    public class Startup
    {
        
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // services.AddCors(
            //     options => { 
            //         options.AddPolicy("AllowAll",
            //             builder => builder
            //                 .AllowAnyHeader()
            //                 .AllowAnyMethod()
            //                 .AllowAnyOrigin()
            //         );
            //     }
            // );
            
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder => {
                        builder.WithOrigins(
                                "https://localhost:5001",
                                "https://localhost:3001"
                            )
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .WithExposedHeaders("Set-Cookie");
                    });
            });

            
            services.AddControllers();

            // services.AddIdentityMongoDbProvider<MongoUser>();

            services.AddIdentityMongoDbProvider<User, UserRole, MongoDB.Bson.ObjectId>(identity => {
                    identity.Password.RequireDigit = false;
                    identity.Password.RequireLowercase = false;
                    identity.Password.RequireNonAlphanumeric = false;
                    identity.Password.RequireUppercase = false;
                    identity.Password.RequiredLength = 1;
                    identity.Password.RequiredUniqueChars = 0;

                },
                mongo => {
                    mongo.ConnectionString = Configuration["SherpaPathDatabaseSettings:ConnectionString"];
                }
            );

            services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
            services.AddSingleton<IAuthorizationHandler, HasClaimHandler>();
            
            services.ConfigureApplicationCookie(options => {
                    options.ReturnUrlParameter = "returnUrl";
                    options.LoginPath = "/login";
                    options.LogoutPath = "/logout";
                    options.ExpireTimeSpan = TimeSpan.FromDays(30);
                    options.Cookie.SameSite = SameSiteMode.None;
                    // TODO: change
                    // options.Cookie.Domain = ".localhost";
                    options.Cookie.HttpOnly = true;
                    // options.Cookie.SecurePolicy = CookieSecurePolicy.;
                    
                }
            );


            // services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true);
            // services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true);
            //
            // services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //     .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            //     {
            //         options.SlidingExpiration = true;
            //         options.ExpireTimeSpan = new TimeSpan(0, 1, 0);
            //     });
            
            // services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //     .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            //     {
            //         options.Events.OnRedirectToLogin = context =>
            //         {
            //             context.Response.Headers["Location"] = context.RedirectUri;
            //             context.Response.StatusCode = 401;
            //             return Task.CompletedTask;
            //         };
            //         options.SlidingExpiration = true;
            //         options.ExpireTimeSpan = new TimeSpan(0, 1, 0);
            //
            //     });

            
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

            // app.UseCors("AllowAll");
            // app.UseCors(builder =>
            //     builder.WithOrigins("https://localhost:5001", "https://localhost:3001")
            //         .AllowAnyOrigin()
            //         .AllowAnyHeader()
            //         .AllowAnyMethod());
            
            // services.AddCors(options =>
            // {
            //     options.AddPolicy(name: MyAllowSpecificOrigins,
            //         builder =>
            //         {
            //             builder.WithOrigins("http://example.com",
            //                 "http://www.contoso.com");
            //         });
            // });
            
            app.UseCors(MyAllowSpecificOrigins);



            app.UseHttpsRedirection();

            app.UseStaticFiles();
 
            app.UseRouting();
            
            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

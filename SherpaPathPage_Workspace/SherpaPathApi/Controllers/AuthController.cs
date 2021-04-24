using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SherpaPathApi.Models;
using SherpaPathApi.Models.Responses;

namespace SherpaPathApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase 
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<UserRole> _roleManager;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            UserManager<User> userManager,
            RoleManager<UserRole> roleManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserCredentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                // var user = await _userManager.GetUserAsync(HttpContext.User);
                var user = await _userManager.FindByEmailAsync(credentials.Email);
                var roles = _roleManager.Roles.ToList()
                    .Where(role => user.Roles.Contains(role.Id.ToString()))
                    .Select(role => role.Name)
                    .ToList();

                return Ok(new LoginResponse {
                        Success = true,
                        Email = user.Email,
                        Roles = roles
                    }
                );
            }
            return Unauthorized(new LoginResponse {
                    Success = false
                }
            );
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Me()
        {
            if (HttpContext.User == null)
                return Unauthorized();
            
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user == null)
                return Unauthorized();

            var roles = _roleManager.Roles.ToList()
                .Where(role => user.Roles.Contains(role.Id.ToString()))
                .Select(role => role.Name)
                .ToList();
            
            return Ok(new MeResponse {
                Email = user.Email,
                Roles = roles
            });
        }
        
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
        
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] UserCredentials credentials)
        {
            bool allowRegister = _configuration.GetValue<bool>("AllowRegister", false);
            if (!allowRegister)
                return Forbid();

            if (ModelState.IsValid)
            {
                var user = new User {
                    UserName = credentials.Email, Email = credentials.Email
                };
                var result = await _userManager.CreateAsync(user, credentials.Password);
                if (!result.Succeeded) 
                    return BadRequest();

                const string roleName = "Admin";
                if (!await _roleManager.RoleExistsAsync(roleName))
                    await _roleManager.CreateAsync(new UserRole(roleName));

                await _userManager.AddToRoleAsync(user, roleName);
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, roleName));
                
                //_logger.LogInformation("User created a new account with password.");
                //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                //var callbackUrl = Url.EmailConfirmationLink(user.Id.ToString(), code, Request.Scheme);
                //await _emailSender.SendEmailAsync(model.Email, callbackUrl, "");
                
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new RegisterResponse {
                    Success = true,
                    Email = user.Email,
                    Roles = new List<string> {
                        roleName
                    }
                });
            }

            // If we got this far, something failed, redisplay form
            return BadRequest();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterAllowed()
        {
            bool allowRegister = _configuration.GetValue<bool>("AllowRegister", false);
            return Ok(new RegisterAllowedResponse {
                    Allowed = allowRegister
                }
            );
        }
    }
}
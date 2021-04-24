using System.Collections.Generic;

namespace SherpaPathApi.Models.Responses
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
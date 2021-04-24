using System.Collections.Generic;

namespace SherpaPathApi.Models.Responses
{
    public class MeResponse
    {
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
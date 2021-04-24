using System.ComponentModel.DataAnnotations;

namespace SherpaPathApi.Models
{
    public class UserCredentials
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
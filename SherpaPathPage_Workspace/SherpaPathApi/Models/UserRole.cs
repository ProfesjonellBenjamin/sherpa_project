using AspNetCore.Identity.Mongo.Model;

namespace SherpaPathApi.Models
{
    public class UserRole : MongoRole
    {
        public UserRole()
        {
        }
        
        public UserRole(string name)
            : base(name)
        {
        }
    }
}
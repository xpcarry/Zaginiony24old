using System;
using Microsoft.AspNetCore.Identity;

namespace Zaginiony24.Models
{
    public class AppUser : IdentityUser<string>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateJoined { get; set; }
    }
}

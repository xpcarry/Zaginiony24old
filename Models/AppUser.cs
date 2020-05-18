using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Zaginiony24.Models
{
    public class AppUser : IdentityUser<string>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateJoined { get; set; }
        [JsonIgnore]
        public virtual ICollection<Notice> Notices { get; set; }
    }
}

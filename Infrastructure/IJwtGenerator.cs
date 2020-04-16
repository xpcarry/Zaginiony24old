using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zaginiony24.Models;

namespace Zaginiony24.Infrastructure
{
    public interface IJwtGenerator
    {
        public string CreateToken(AppUser user);
    }
}

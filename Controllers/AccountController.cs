using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Zaginiony24.Infrastructure;
using Zaginiony24.Models;

namespace Zaginiony24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Zaginiony24BaseController<AccountController>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public AccountController(ILogger<AccountController> logger, 
            UserManager<AppUser> userManager,
            RoleManager<Role> roleManager) 
            : base(logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
    }
}
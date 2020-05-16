using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Logging;
using Zaginiony24.Infrastructure;
using Zaginiony24.Models;
using Zaginiony24.Models.Biding;
using Zaginiony24.Models.View;

namespace Zaginiony24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Zaginiony24BaseController<AccountController>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IUserAccessor _userAccessor;


        public AccountController(ILogger<AccountController> logger,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IJwtGenerator jwtGenerator,
            IUserAccessor userAccessor)
            : base(logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _userAccessor = userAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        { 
            var appUser = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
            var user = new User
            {
                Username = appUser.UserName,
                Email = appUser.Email,
                AccessToken = _jwtGenerator.CreateToken(appUser)
            };
            
            return Ok(new ApiResult<User> {Result = user});
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginBm query)
        {

            var user = await _userManager.FindByEmailAsync(query.Email);
            if (user == null)
            {
                return BadRequest(new ApiResult<string>(ErrorCodes.InvalidUserName));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, query.Password, false);

            if (result.Succeeded)
            {
                return Ok(new ApiResult<User>
                {
                    Result = new User
                    {
                        Username = user.UserName,
                        Email = user.Email,
                        AccessToken = _jwtGenerator.CreateToken(user)
                    }
                });
            }
            return Unauthorized(new ApiResult<string>(ErrorCodes.NoAccess));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterBm model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) != null)
                return BadRequest(new ApiResult<string>(ErrorCodes.UserWithThisEmailAlreadyExists));

            if (await _userManager.FindByNameAsync(model.Username) != null)
                return BadRequest(new ApiResult<string>(ErrorCodes.UserWithThisUsernameAlreadyExists));

            if (!model.Password.Equals(model.ConfirmPassword))
                return BadRequest(new ApiResult<string>(ErrorCodes.PasswordDoNotMatch));

            var user = new AppUser
            {
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                UserName = model.Username,
                Name = model.Name,
                Surname = model.Surname,
                DateJoined = DateTime.Now
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(new ApiResult<string>(result.Errors.First().ToString()));
            return Created("", result);
        }
    }
}
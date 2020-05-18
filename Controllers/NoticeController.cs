using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Zaginiony24.Infrastructure;
using Zaginiony24.ModelRepositories;
using Zaginiony24.Models;
using Zaginiony24.Models.View;

namespace Zaginiony24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : Zaginiony24BaseController<NoticeController>
    {
        private readonly INoticeRepository _noticeRepository;
        private readonly UserManager<AppUser> _userManager;

        public NoticeController(ILogger<NoticeController> logger,
            INoticeRepository noticeRepository,
            UserManager<AppUser> userManager) 
            : base(logger)
        {
            _noticeRepository = noticeRepository;
            _userManager = userManager;
        }

        [HttpGet("ListAll")]
        public async Task<IActionResult> ListAll()
        {
            var result = await _noticeRepository.GetAllNotices();
            if (result == null)
                return BadRequest(new ApiResult<dynamic>(ErrorCodes.CannotFindAnyNotice));
            return Ok(new ApiResult<List<Notice>> {Result = result});
        }

        [HttpGet("Details")]
        public async Task<IActionResult> Details([FromQuery]Guid id)
        {
            var notice = await _noticeRepository.GetAsync(id);
            if (notice == null)
                return NotFound(new ApiResult<dynamic>(ErrorCodes.InvalidNoticeId));
            var user = await _userManager.FindByIdAsync(notice.AppUserId);

            var userInfo = new UserInfo
            {
                Username = user?.UserName,
                Email = user?.Email,
                Name = user?.Name
            };
            var result = new NoticeDetails
            {
                Notice = notice,
                User = userInfo
            };
            return Ok(new ApiResult<NoticeDetails> {Result = result});
        }

    }
}
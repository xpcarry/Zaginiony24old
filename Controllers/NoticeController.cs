using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Zaginiony24.Infrastructure;
using Zaginiony24.ModelRepositories;
using Zaginiony24.Models;

namespace Zaginiony24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : Zaginiony24BaseController<NoticeController>
    {
        private readonly INoticeRepository _noticeRepository;

        public NoticeController(ILogger<NoticeController> logger,
            INoticeRepository noticeRepository) 
            : base(logger)
        {
            _noticeRepository = noticeRepository;
        }

        [HttpGet("ListAll")]
        public async Task<IActionResult> ListAll()
        {
            var result = await _noticeRepository.GetAllNoticies();
            if (result == null)
                return BadRequest(new ApiResult<dynamic>(ErrorCodes.CannotFindAnyNotice));
            return Ok(new ApiResult<List<Notice>> {Result = result});
        }
    }
}
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
using Zaginiony24.Models.View;

namespace Zaginiony24.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Zaginiony24BaseController<HomeController>
    {
        private readonly INoticeRepository _noticeRepository;

        public HomeController(ILogger<HomeController> logger,
            INoticeRepository noticeRepository) 
            : base(logger)
        {
            _noticeRepository = noticeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Index([FromQuery]string? gender)
        {
            var noticies = new List<Notice>();
            if (string.IsNullOrEmpty(gender))
                noticies = await _noticeRepository.GetAllNoticies();
            else
                noticies = await _noticeRepository.GetByGender(gender);

            var result = new List<NoticeShortcutVm>();

            foreach (var notice in noticies)
            {
                result.Add(new NoticeShortcutVm
                {
                    Id = notice.NoticeId,
                    Name = notice.Name,
                    Surname = notice.Surname,
                    Date = notice.DateOfDisappearance.ToShortDateString(),
                    Gender = notice.Gender,
                    Age = notice.Age,
                    LastSeenPlace = notice.LastSeenPlace
                });
            }

            return Ok(new ApiResult<List<NoticeShortcutVm>> {Result = result});
        }

    }
}
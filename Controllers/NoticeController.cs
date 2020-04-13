using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Zaginiony24.Infrastructure;
using Zaginiony24.ModelRepositories;

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
    }
}
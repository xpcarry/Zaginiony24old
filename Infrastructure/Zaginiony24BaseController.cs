using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Zaginiony24.Infrastructure
{
    public class Zaginiony24BaseController<TController> : ControllerBase
    {
        protected readonly ILogger<TController> _logger;

        public Zaginiony24BaseController(ILogger<TController> logger)
        {
            _logger = logger;
        }
    }
}
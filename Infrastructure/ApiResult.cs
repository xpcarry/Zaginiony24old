using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Zaginiony24.Infrastructure
{
    public class ApiResult<TResult>
    {
        public TResult Result { get; set; }
        public List<string> ErrorCodes { get; set; }
        public bool IsSuccess => ErrorCodes == null || !ErrorCodes.Any();

        public ApiResult()
        {
            ErrorCodes = new List<string>();
        }
        public ApiResult(string errorCode)
            :this()
        {
            ErrorCodes.Add(errorCode);
        }
        public ApiResult(IEnumerable<string> errorCodes)
            : this()
        {
            ErrorCodes.AddRange(errorCodes);
        }
        public ApiResult(params string[] errorCodes)
            : this()
        {
            ErrorCodes.AddRange(errorCodes);
        }

    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Zaginiony24.Infrastructure;
using Zaginiony24.Models;

namespace Zaginiony24.ModelRepositories
{
    public interface INoticeRepository : IRepository<Notice>
    {
        Task<Notice> GetAsync(Guid noticeId);
        Task<List<Notice>> GetAllNoticies();
        Task<List<Notice>> GetByGender(string gender);
    }
}

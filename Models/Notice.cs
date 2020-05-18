using System;
using System.Text.Json.Serialization;

namespace Zaginiony24.Models
{
    public class Notice
    {
        public Guid NoticeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public DateTime DateOfDisappearance { get; set; }
        public string LastSeenPlace { get; set; }
        public int Height { get; set; }
        public int Age { get; set; }
        public string EyeColor { get; set; }
        public string SpecialCharacters { get; set; }
        public string Description { get; set; }
        public DateTime DatePosted { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public virtual AppUser AppUser { get; set; }
    }
}

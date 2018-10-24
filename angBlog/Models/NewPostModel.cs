
using System.ComponentModel.DataAnnotations;

namespace angBlog.Models
{
    public class NewPostModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string Images { get; set; } = "assets/images/people.png";

        //[Required]
        //[DataType(DataType.Text)]
        //public string Tags { get; set; }
    }
}
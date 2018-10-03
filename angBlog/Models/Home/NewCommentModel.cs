
using System.ComponentModel.DataAnnotations;


namespace ngTest.Models
{
    public class NewCommentModel
    {
        public string PostId { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Content { get; set; }
    }
}
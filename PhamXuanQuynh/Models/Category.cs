using System.ComponentModel.DataAnnotations;

namespace PhamXuanQuynh.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Phải nhập tên sản phẩm")]
        public string? CategoryName { get; set; }

        public List<Product>? Products { get; set; }  // Navigation property
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhamXuanQuynh.Models
{
    public class Product
    {
        public class ProductViewModel
        {
            [Key]
            public int ProductId { get; set; }

            [Required(ErrorMessage = "Phải nhập tên sản phẩm")]
            public string? ProdcutName { get; set; }

            [Range(0.1, 10000, ErrorMessage = "Giá sản phải nằm trong khoảng từ 0-10000")]
            public decimal ProductPrice { get; set; }

            [ForeignKey("Category")]
            public int CategoryId { get; set; }

            public Category? Category { get; set; } // Navigation property
        }
    }
}

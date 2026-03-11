using Microsoft.AspNetCore.Mvc;
using PhamXuanQuynh.Models;

namespace PhamXuanQuynh.Controllers
{
    public class CategoryController : Controller
    {
        // Gia lap co so du lieu category
        List<Category> categories = new List<Category>
        {
            new Category{CategoryId=1, CategoryName="Điện thoại"},
            new Category{CategoryId=2, CategoryName="Máy tính"},
            new Category{CategoryId=3, CategoryName="Laptop"},
            new Category{CategoryId=4, CategoryName="Đèn pin"},
        };

        public IActionResult Index()
        {
            return View(categories);
        }
    }
}

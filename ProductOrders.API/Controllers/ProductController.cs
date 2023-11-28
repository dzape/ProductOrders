using Microsoft.AspNetCore.Mvc;
using ProductOrders.BL.Service;
using ProductOrders.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _productService.GetAllProducts();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return _productService.GetProductById(id);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            if(_productService.ProductExist(product))
            {
                return ValidationProblem("Product Already Exist");
            }

            await _productService.AddProduct(product);
            return Ok(product);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(Product product)
        {
            if (_productService.DeleteProduct(product))
            {
                return Ok("Product Deleted");
            }

            return BadRequest();
        }
    }
}

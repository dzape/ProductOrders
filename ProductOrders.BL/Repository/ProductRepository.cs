using ProductOrders.Data;
using ProductOrders.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductOrders.BL.Repository
{
    public class ProductRepository : IProductRepository
    {
        private ProductOrdersContext _context;

        public ProductRepository(ProductOrdersContext context)
        {
            _context = context;
        }

        public async Task<Product> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            _context.SaveChanges();
            return product;
        }

        public bool DeleteProduct(Product product)
        {
            try
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products;
        }

        public bool UpdateProduct(Product product)
        {
            try
            {
                _context.Products.Update(product);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

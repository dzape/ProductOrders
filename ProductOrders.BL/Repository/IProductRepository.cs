using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Repository
{
    public interface IProductRepository
    {
        public IEnumerable<Product> GetAllProducts();

        public Task<Product> AddProduct(Product product);
        public bool DeleteProduct(Product product);
    }
}

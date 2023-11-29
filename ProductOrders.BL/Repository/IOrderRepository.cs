using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Repository
{
    public interface IOrderRepository
    {
        public IEnumerable<Order> GetAllOrders();
        public Task<Order> AddOrder(Order order);
        public bool UpdateOrder(Order order);
        public bool DeleteOrder(Order order);
    }
}

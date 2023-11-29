using ProductOrders.Data;
using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private ProductOrdersContext _context;

        public OrderRepository(ProductOrdersContext context)
        {
            _context = context;
        }

        public async Task<Order> AddOrder(Order order)
        {
            await _context.Orders.AddAsync(order);
            _context.SaveChanges();
            return order;
        }

        public bool DeleteOrder(Order order)
        {
            try
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _context.Orders;
        }

        public bool UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}

using ProductOrders.Data;
using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Repository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private ProductOrdersContext _context;

        public OrderDetailRepository(ProductOrdersContext context)
        {
            _context = context;
        }

        public IEnumerable<OrderDetail> GetAllDetails()
        {
            return _context.OrderDetails;
        }
    }
}

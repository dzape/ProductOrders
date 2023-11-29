using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Repository
{
    public interface IOrderDetailRepository
    {
        public IEnumerable<OrderDetail> GetAllDetails();
    }
}

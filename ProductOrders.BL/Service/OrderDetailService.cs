using ProductOrders.BL.Repository;
using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Service
{
    public class OrderDetailService
    {
        private IOrderDetailRepository _orderDetailRepository;
        private ProductService _productService;

        public OrderDetailService(IOrderDetailRepository orderDetailRepository, ProductService productService)
        {
            _orderDetailRepository = orderDetailRepository;
            _productService = productService;

        }

        public ICollection<OrderDetail> GetAllOrderDetailsForOrder(int id)
        {
            var OrderDetails = _orderDetailRepository.GetAllDetails().Where((obj) => obj.OrderId == id).ToList();

            foreach (var orderDetail in OrderDetails)
            {
                orderDetail.Product = _productService.GetProductById(orderDetail.ProductId);
            }

            return OrderDetails;
        }
    }
}

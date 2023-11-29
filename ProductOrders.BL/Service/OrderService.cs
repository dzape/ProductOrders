using ProductOrders.BL.Repository;
using ProductOrders.Data.Entities;

namespace ProductOrders.BL.Service
{
    public class OrderService
    {
        private IOrderRepository _orderRepository;
        private ProductService _productService;
        private OrderDetailService _orderDetailService;

        public OrderService(IOrderRepository orderRepository, ProductService productService, OrderDetailService orderDetailService)
        {
            _orderRepository = orderRepository;
            _productService = productService;
            _orderDetailService = orderDetailService;
        }

        public IEnumerable<Order> GetAllOrders()
        {
            var orders = _orderRepository.GetAllOrders();

            foreach (var order in orders)
            {
                order.OrderDetails = _orderDetailService.GetAllOrderDetailsForOrder(order.OrderId);
            }

            return orders;
        }

        public Order GetOrderById(int id)
        {
            return _orderRepository.GetAllOrders().FirstOrDefault((order) => order.OrderId == id);
        }

        public async Task<Order> AddOrder(Order order)
        {

            foreach (var orderDetail in order.OrderDetails)
            {
                orderDetail.Product = _productService.GetProduct(orderDetail.Product);
            }

            return await _orderRepository.AddOrder(order);
        }

        public bool DeleteOrder(Order order)
        {
            return _orderRepository.DeleteOrder(order);
        }

        public bool OrderExist(Order order)
        {
            var orders = _orderRepository.GetAllOrders();

            var match = orders.FirstOrDefault((obj) =>
                obj.FullName == order.FullName &&
                obj.Address == order.Address &&
                obj.Contact == order.Contact &&
                obj.OrderDate == order.OrderDate &&
                obj.OrderDetails == order.OrderDetails
            );

            return match == null || orders.Count() != 0 ? false : true;
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using ProductOrders.BL.Service;
using ProductOrders.Data.Entities;

namespace ProductOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _orderService.GetAllOrders();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order order)
        {
            if (_orderService.OrderExist(order))
            {
                return ValidationProblem("Product Already Exist");
            }

            await _orderService.AddOrder(order);
            return Ok(order);
        }

    }
}

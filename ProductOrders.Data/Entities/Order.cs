namespace ProductOrders.Data.Entities
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int OrderId { get; set; }
        public string FullName { get; set; } = null!;
        public string Contact { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime OrderDate { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

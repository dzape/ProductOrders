namespace ProductOrders.Data.Entities
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string Manufacturer { get; set; } = null!;

    }
}

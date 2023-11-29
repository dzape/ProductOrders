using Microsoft.EntityFrameworkCore;
using ProductOrders.BL.Repository;
using ProductOrders.BL.Service;
using ProductOrders.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ProductOrdersContext>((options) =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString")), ServiceLifetime.Singleton);


builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<ProductService, ProductService>();
builder.Services.AddScoped<OrderService, OrderService>();
builder.Services.AddScoped<OrderDetailService, OrderDetailService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

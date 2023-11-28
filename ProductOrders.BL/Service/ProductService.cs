﻿using ProductOrders.BL.Repository;
using ProductOrders.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductOrders.BL.Service
{
    public class ProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }

        public Product GetProductById(int id)
        {
            return _productRepository.GetAllProducts().FirstOrDefault((product) => product.ProductId == id);
        }

        public async Task<Product> AddProduct(Product product)
        {
            return await _productRepository.AddProduct(product);
        }

        public bool ProductExist(Product product)
        {
            var match = _productRepository.GetAllProducts().FirstOrDefault((curentProduct) =>
                curentProduct.Name == product.Name && curentProduct.Manufacturer == product.Manufacturer
            );

            return match != null ? true : false;
        }

        public bool DeleteProduct(Product product)
        {
            return _productRepository.DeleteProduct(product);
        }

    }
}
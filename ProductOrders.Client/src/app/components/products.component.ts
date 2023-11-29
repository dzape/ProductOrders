import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { UrlResolver } from '../config/url-resolver';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  template: `
    <div class="product-container color-text-white">
      <h4 class="header-container">Create a new order.</h4>

      <mat-selection-list #productsList [(ngModel)]="selectedProducts">
        @for (product of products; track product) {
        <mat-list-option [value]="product">
          {{ product.name }}
          {{ product.price }}
          {{ product.manufacturer }}
        </mat-list-option>
        }
      </mat-selection-list>

      <div class="footer-container">
        <p>
          Options selected: {{ productsList.selectedOptions.selected.length }}
        </p>
        <button mat-raised-button color="primary">Order</button>
      </div>
    </div>
  `,
  styles: `
    .product-container {
      max-width: 350px;
      margin: 1rem;
      padding: 1rem;
      background-color: #3f3f3f;
    }

    .color-text-white {
      color: white
    }

    .header-container {
      text-align: center;
      font-size: 34px;
      padding: 10px;
    }
    
    .footer-container {
      display: inline-flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .footer-container > p {
      margin: 0;
    }
  `,
})
export class ProductsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  selectedProducts: any;

  products: Product[] = new Array<Product>();

  ngOnInit(): void {
    this.httpClient
      .get<Product[]>(UrlResolver.products)
      .pipe(take(1))
      .subscribe((arr: Product[]) => {
        this.products = arr;
      });
  }

  List() {
    console.log(this.selectedProducts);
  }
}

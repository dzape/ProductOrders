import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { UrlResolver } from '../config/url-resolver';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from './order.component';

@Component({
  selector: 'app-products',
  template: `
    <div class="product-container color-text-white">
      <h4 class="header-container">Create a new order.</h4>

      <mat-selection-list #productsList [(ngModel)]="selectedProducts">
        @for (product of products; track product) {
        <mat-list-option [value]="product">
          <div class="list-row-container">
            <div>
              {{ product.name }}
              {{ product.price }}
              {{ product.manufacturer }}
            </div>

            <div style="width: 50px;">
              <mat-form-field>
                <input matInput [value]="1" [(ngModel)]="product.quantity" />
              </mat-form-field>
            </div>
          </div>
        </mat-list-option>
        }
      </mat-selection-list>

      <div class="footer-container">
        <p>
          Options selected: {{ productsList.selectedOptions.selected.length }}
        </p>
        <button
          mat-raised-button
          color="primary"
          (click)="order(selectedProducts)"
        >
          Order
        </button>
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

    .list-row-container {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }

    .mat-mdc-form-field {
      width: 100%
    }
  `,
})
export class ProductsComponent implements OnInit {
  selectedProducts: any;

  products: Product[] = new Array<Product>();

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.httpClient
      .get<Product[]>(UrlResolver.products)
      .pipe(take(1))
      .subscribe((arr: Product[]) => {
        this.products = arr;
      });
  }

  order(list: any) {
    console.log(list);

    const dialogRef = this.dialog.open(OrderComponent, {
      data: {
        products: list,
        httpClient : this.httpClient
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Order-OK') {
        console.log('New order created.');
      }
    });
  }
}

//     "orderId": 6,
//     "fullName": "Anix",
//     "contact": "anix@gmail.com",
//     "address": "levo",
//     "orderDate": "2023-11-29T00:00:00",
//     "orderDetails": [
//       {
//         "orderDetailId": 7,
//         "productId": 7,
//         "orderId": 6,
//         "quantity": 5,
//         "product": {
//           "productId": 7,
//           "name": "Ball",
//           "price": 100,
//           "manufacturer": "Nike"
//         }
//       },
//       {
//         "orderDetailId": 8,
//         "productId": 1,
//         "orderId": 6,
//         "quantity": 2,
//         "product": {
//           "productId": 1,
//           "name": "Ball",
//           "price": 100,
//           "manufacturer": "Spalding"
//         }
//       }
//     ]
//   }

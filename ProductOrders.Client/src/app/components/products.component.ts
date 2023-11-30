import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { UrlResolver } from '../config/url-resolver';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from './order.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
          [disabled]="productsList.selectedOptions.selected.length == 0"
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

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get<Product[]>(UrlResolver.products)
      .pipe(take(1))
      .subscribe((arr: Product[]) => {
        this.products = arr;
      });
  }

  order(list: any) {
    const dialogRef = this.dialog.open(OrderComponent, {
      data: {
        products: list,
        httpClient: this.httpClient,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Order-Created') {
        this.snackBar.open('Order created', undefined, { duration: 3000 });
        this.selectedProducts = [];
        this.products = new Array<Product>();
      }
    });
  }
}

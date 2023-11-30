import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../models/order.model';
import { UrlResolver } from '../config/url-resolver';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  template: `
    <div class="order-container">
      <div>
        <mat-list role="list">
          @for (product of data.products; track product) {
          <mat-list-item role="listitem"
            >{{ product.name }} -- {{ product.manufacturer }} --
            {{ product.quantity }}</mat-list-item
          >
          }
        </mat-list>
      </div>
      <div class="form-container">
        <mat-form-field class="example-full-width">
          <mat-label>Full Name</mat-label>
          <input matInput [(ngModel)]="order.fullname" placeholder="Pero" />
        </mat-form-field>
        <mat-form-field class="example-full-width">
          <mat-label>Contact info email / phone</mat-label>
          <input
            matInput
            [(ngModel)]="order.contact"
            placeholder="x@gmail.com / +389 71 123 123"
          />
        </mat-form-field>
        <mat-form-field class="example-full-width">
          <mat-label>Address</mat-label>
          <input
            matInput
            [(ngModel)]="order.address"
            placeholder="Partizanska 123"
          />
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="confirm()">
          Confirm
        </button>
      </div>
    </div>
  `,
  styles: `
    .order-container {
        padding: 1rem;    
    }

    .form-container {
        display: grid;
    }
  `,
})
export class OrderComponent {
  order: Order = new Order();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { products: Product[]; httpClient: HttpClient },
    private dialogRef: MatDialogRef<OrderComponent>,
    private snackBar: MatSnackBar
  ) {}

  confirm() {
    this.data.products.forEach((obj) => {
      this.order.orderDetails.push({
        quantity: obj.quantity,
        product: {
          name: obj.name,
          price: obj.price,
          manufacturer: obj.manufacturer,
        },
      });

      this.data.httpClient
        .post(UrlResolver.orders, this.order)
        .pipe(take(1))
        .subscribe((response) => {
          if (response) {
            this.snackBar.open('Order created', undefined, { duration: 3000 });
          }

          console.log(response);
        });
    });

    console.log(this.order);
    this.dialogRef.close();
  }
}

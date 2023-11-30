import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UrlResolver } from '../../config/url-resolver';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css',
})
export class OrderTableComponent implements OnInit {
  /**
   *
   */
  constructor(private httpClient: HttpClient) {}

  Orders: Order[] = new Array<Order>();

  ngOnInit(): void {
    this.httpClient
      .get<Order[]>(UrlResolver.orders)
      .pipe(take(1))
      .subscribe((arr: Order[]) => {
        this.Orders = arr;
        console.warn(arr);
      });
  }

  

}

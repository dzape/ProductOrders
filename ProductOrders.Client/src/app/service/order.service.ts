import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlResolver } from '../config/url-resolver';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public AddOrder(order: any) {
    return this.httpClient.post(UrlResolver.orders, order);
  }
}

import { OrderDetail } from './order-detail.model';

export class Order {
  fullName: string = '';
  contact: string = '';
  address: string = '';
  orderDate: Date = new Date();
  orderDetails: OrderDetail[] = [];

  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}

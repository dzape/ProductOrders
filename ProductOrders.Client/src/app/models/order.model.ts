import { OrderDetail } from './order-detail.model';

export class Order {
  fullname: string = '';
  contact: string = '';
  address: string = '';
  date: Date = new Date();
  orderDetails: OrderDetail[] = [];

  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}

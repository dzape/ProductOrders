import { Product } from './product.model';

export class OrderDetail {
  quantity: number| undefined = 0;
  product: Product = new Product();

  constructor(init?: Partial<OrderDetail>) {
    Object.assign(this, init);
  }
}

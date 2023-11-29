import { Product } from "./product.model";

export class OrderDetail {
    id: number;
    productId: number;
    orderId: number;
    quantity: number;
    product: Product[];

    constructor(init?: Partial<OrderDetail>) {
        Object.assign(this, init);
    }
}
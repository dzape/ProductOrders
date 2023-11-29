export class Order {
    id: number;
    name: string;
    contact: string;
    address: string;
    date: Date;

    constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }
}
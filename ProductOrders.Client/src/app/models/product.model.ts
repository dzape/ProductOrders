export class Product {
    id: number;
    name: string;
    price: string;
    manufacturer: string;

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}
export class Product {
    name: string = "";
    price: string = "";
    manufacturer: string = "";
    quantity?: number = 1;

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}

export class Product {
    id: number = 0;
    name: string = "";
    price: string = "";
    manufacturer: string = "";

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}
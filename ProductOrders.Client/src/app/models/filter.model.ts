export class FilterObject {
  searchString: string = '';
  product: string = '';
  manufacturer: string = '';
  quantity: number = 0;
  date: Date = new Date();

  constructor(init?: Partial<FilterObject>) {
    Object.assign(this, init);
  }
}

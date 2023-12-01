import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order.model';
import { FilterObject } from '../models/filter.model';

@Pipe({
  name: 'filterOrders',
  pure: false,
})
export class FilterOrdersPipe implements PipeTransform {
  transform(orders: Order[], filterObject: FilterObject): Order[] {
    if (
      filterObject.searchString == '' &&
      filterObject.product == '' &&
      filterObject.manufacturer == '' &&
      !filterObject.date
    )
      return orders;

    const result = orders.filter(
      (order) =>
        order.fullName == filterObject.searchString ||
        this.comareDates(order.orderDate, filterObject.date)||
        order.orderDetails.filter(
          (obj) => obj.product.name == filterObject.product
        ).length > 0 ||
        order.orderDetails.filter(
          (obj) => obj.product.manufacturer == filterObject.manufacturer
        ).length > 0
    );

    console.log(result);

    return result;
  }

  private comareDates(date1: Date, date2: Date) {
    const orderDate = new Date(date1).setHours(0, 0, 0, 0);
    const filterDate = new Date(date2).setHours(0, 0, 0, 0);

    return orderDate == filterDate;
  }
}

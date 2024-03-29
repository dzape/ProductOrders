import { NgModule } from '@angular/core';

import { MateralModule } from './material.module';
import { OrderComponent } from '../components/order.component';
import { OrderTableComponent } from '../components/orders-table/orders-table.component';

@NgModule({
  declarations: [OrderComponent],
  imports: [MateralModule],
  exports: [OrderComponent],
})
export class OrdrerModule {}

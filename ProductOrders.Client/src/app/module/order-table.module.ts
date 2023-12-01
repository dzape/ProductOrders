import { NgModule } from '@angular/core';

import { MateralModule } from './material.module';
import { OrderTableComponent } from '../components/orders-table/orders-table.component';
import { DatePipe } from '@angular/common';
import { FilterOrdersPipe } from '../pipe/filter.pipe';

@NgModule({
  declarations: [OrderTableComponent, FilterOrdersPipe],
  imports: [MateralModule, DatePipe],
  exports: [OrderTableComponent],
})
export class OrderTableModule {}

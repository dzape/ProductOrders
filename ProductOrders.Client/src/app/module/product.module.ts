import { NgModule } from '@angular/core';

import { ProductsComponent } from '../components/products.component';
import { MateralModule } from './material.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [MateralModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}

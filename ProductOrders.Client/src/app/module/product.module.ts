import { NgModule } from '@angular/core';

import { ProductsComponent } from '../components/products.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [HttpClientModule, MatListModule, FormsModule, MatButtonModule],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {}

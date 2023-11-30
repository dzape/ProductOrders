import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './module/product.module';
import { HttpClientModule } from '@angular/common/http';
import { OrdrerModule } from './module/order.module';
import { OrderTableModule } from './module/order-table.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductsModule,
    OrdrerModule,
    HttpClientModule,
    OrderTableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OrderProduct';
}

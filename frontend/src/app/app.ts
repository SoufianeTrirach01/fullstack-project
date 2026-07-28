import { Component, signal } from '@angular/core';
import { ProductList } from './components/product-list/product-list';
import { HeaderComponent } from './components/header/header';
import { OrderHistory } from './components/order-history/order-history';

@Component({
  selector: 'app-root',
imports: [
    ProductList, 
    HeaderComponent ,
    OrderHistory
  ],  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}


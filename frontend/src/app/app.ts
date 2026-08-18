import { Component, inject, signal } from '@angular/core';
import { ProductList } from './components/product-list/product-list';
import { HeaderComponent } from './components/header/header';
import { OrderHistory } from './components/order-history/order-history';
import { AuthComponent } from './components/auth/auth';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
imports: [
    ProductList, 
    HeaderComponent ,
    OrderHistory,
    AuthComponent // 3. Ajoute-le ici !
  ],  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  public authService = inject(AuthService);
}


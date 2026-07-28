import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../services/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
imports: [
    CommonModule // 2. AJOUTE LE ICI ! Cela donne accès à CurrencyPipe, DatePipe, etc.
  ],  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
export class OrderHistory implements OnInit{
  orders: any[] = [];
  
  constructor(
    private orderService: Order,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    // ON ÉCOUTE LE CANAL : Dès qu'une commande est validée ailleurs, on recharge !
    this.orderService.orderCreated$.subscribe(() => {
      this.loadOrders();
    });
  
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        // On trie pour avoir les commandes les plus récentes en premier
        this.orders = data.reverse();
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes', err);
      }
    });
  }
}

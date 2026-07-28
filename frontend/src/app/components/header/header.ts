import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Order } from '../../services/order'; 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class HeaderComponent {
  public cartService = inject(CartService);
private orderService = inject(Order); // Utilise 'Order' ici aussi !  // On expose le service au HTML pour lire directement les Signals

  onCheckout(): void {
    
    this.cartService.checkout().subscribe({
      next: (response) => {
        alert(`🎉 Commande validée avec succès ! ID de commande : ${response.id}`);
        // On utilise la variable de classe avec 'this.'
        this.orderService.notifyOrderCreated();
      },
      error: (err) => {
        console.error('Erreur lors du checkout :', err);
        alert('❌ Une erreur est survenue lors de la validation.');
      }
    });
  }

}
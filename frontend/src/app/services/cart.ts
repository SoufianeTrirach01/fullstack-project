import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/Product';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
constructor(private http: HttpClient) { }
  // 1. Le Signal qui stocke la liste des éléments du panier (état initial : tableau vide)
  cartItems = signal<CartItem[]>([]);

  // 2. Un Signal "calculé" (computed) : il se met à jour automatiquement quand cartItems change
  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  // 3. Un autre Signal calculé pour le nombre total d'articles dans le panier
  totalQuantity = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product): void {
    const items = this.cartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      // Si le produit est déjà là, on augmente la quantité
      existingItem.quantity += 1;
      this.cartItems.set([...items]); // On "set" la nouvelle valeur pour réveiller Angular
    } else {
      // Sinon, on l'ajoute au tableau
      this.cartItems.set([...items, { product, quantity: 1 }]);
    }
  }
  // 3. Nouvelle méthode pour valider la commande
  checkout(): Observable<any> {
    const url = 'http://localhost:8080/api/orders';
    
    // On formate les données sous la forme attendue par le DTO Spring Boot (OrderRequest)
    const body = {
      items: this.cartItems().map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    // On envoie la requête et on vide le panier si l'envoi réussit grâce à l'opérateur 'tap' de RxJS
    return this.http.post(url, body).pipe(
      tap(() => {
        this.cartItems.set([]); // Réinitialise le panier (remet à vide)
      })
    );
  }
}
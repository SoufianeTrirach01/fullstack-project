import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef ,
    private carteService:CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log("--> 1. La méthode loadProducts() est bien lancée !");
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log("--> 2. Le Back-End a répondu ! Données reçues :", data);
        this.products = data;
        // <-- 3. L'ARME SECRÈTE : On dit à Angular "Hé ! Les données ont changé, redessine le HTML !"
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("--> ATTENTION, Erreur lors de l'appel :", err);
      }
    });
  }
  // 2. Crée la méthode d'ajout
  addToCart(product: Product): void {
    this.carteService.addToCart(product);
    console.log("Produit ajouté ! Panier actuel :", this.carteService.cartItems());
  }
}
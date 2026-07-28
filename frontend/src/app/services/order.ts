import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Service()
export class Order {
    private apiUrl = 'http://localhost:8080/api/orders';

private http = inject(HttpClient);


  // Ce canal va diffuser un signal à chaque nouvelle commande passée
  orderCreated$ = new Subject<void>();

  // Permet de récupérer toutes les commandes depuis Spring Boot
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } 

  // Méthode pour déclencher le signal
  notifyOrderCreated(): void {
    this.orderCreated$.next();
  }
}

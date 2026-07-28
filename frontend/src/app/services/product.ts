import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root' // Le service est un Singleton, unique pour toute l'application
})

export class ProductService {
    // L'URL de notre API Spring Boot connectée à Docker
    private apiUrl = 'http://localhost:8080/api/products';

    constructor(private http: HttpClient) { }
// Cette méthode prépare la requête mais ne la déclenche pas encore (car c'est un Observable)
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
    }
}

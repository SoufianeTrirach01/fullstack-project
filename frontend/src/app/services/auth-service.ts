import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Service()
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private http = inject(HttpClient);
    // Utilisation d'un Signal pour suivre l'état de connexion en temps réel dans toute l'app
    currentUser = signal<{ name: string; email: string } | null>(null);
    constructor() {
        // Au démarrage de l'application, on vérifie si un utilisateur était déjà connecté
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');

        if (token && name && email) {
            this.currentUser.set({ name, email });
        }
    }
    register(user: any): Observable<string> {
        return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                // Sauvegarde du jeton et des infos dans le navigateur
                localStorage.setItem('token', response.token);
                localStorage.setItem('userName', response.name);
                localStorage.setItem('userEmail', response.email);

                // Mise à jour du signal
                this.currentUser.set({ name: response.name, email: response.email });
            })
        );
    }

    logout(): void {
        localStorage.clear();
        this.currentUser.set(null);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }
}


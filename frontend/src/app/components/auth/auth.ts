import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  isLoginMode = signal<boolean>(true); // Mode Connexion par défaut
  errorMessage = signal<string>('');

  // Modèle de données pour l'envoi au Back-End
  authData = {
    name: '',
    email: '',
    password: ''
  };

  toggleMode(): void {
    this.isLoginMode.update(mode => !mode);
    this.errorMessage.set('');
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (this.isLoginMode()) {
      // Bloc de Connexion
      this.authService.login({ email: this.authData.email, password: this.authData.password }).subscribe({
        next: () => {
          alert('👋 Connexion réussie !');
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage.set(err.error || 'Identifiants invalides.');
          this.cdr.detectChanges();
        }
      });
    } else {
      // Bloc d'Inscription
      this.authService.register(this.authData).subscribe({
        next: () => {
          alert('🎉 Compte créé ! Connectez-vous maintenant.');
          this.isLoginMode.set(true); // Redirection vers l'écran login
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage.set(err.error || "Erreur lors de l'inscription.");
          this.cdr.detectChanges();
        }
      });
    }
  }
}
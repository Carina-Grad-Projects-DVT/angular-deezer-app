import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: ` <p-button (click)="loginWithRedirect()" class="bg-brand-green">Log In</p-button> `,
  imports: [ButtonModule],
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}

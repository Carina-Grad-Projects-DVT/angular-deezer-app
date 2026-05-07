import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: ` <p-button (click)="loginWithRedirect()" class="bg-brand-green">Log In</p-button> `,
  imports: [ButtonModule],
})
export class LoginButtonComponent {
  private auth = inject(AuthStore);

  loginWithRedirect(): void {
    this.auth.login();
  }
}

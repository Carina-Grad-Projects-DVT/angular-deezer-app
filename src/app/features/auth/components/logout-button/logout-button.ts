import { Component, inject } from '@angular/core';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: ` <button (click)="logout()" class="button logout">Log Out</button> `,
})
export class LogoutButtonComponent {
  private auth = inject(AuthStore);

  logout(): void {
    this.auth.logout();
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginButtonComponent } from '../../components/login-button/login-button';
import { LogoutButtonComponent } from '../../components/logout-button/logout-button';
import { AuthService } from '@auth0/auth0-angular';

// Used almost exact copy of what Auth0 provided in docs
@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  imports: [CommonModule, LoginButtonComponent, LogoutButtonComponent],
})
export class LoginPage {
  protected auth = inject(AuthService);
}

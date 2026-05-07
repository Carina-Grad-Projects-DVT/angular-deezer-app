import { Injectable, computed, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private auth = inject(AuthService);

  // Signals from Auth0 observables
  readonly user = toSignal(this.auth.user$, { initialValue: null });
  readonly isAuthenticated = toSignal(this.auth.isAuthenticated$, {
    initialValue: false,
  });
  readonly isLoading = toSignal(this.auth.isLoading$, {
    initialValue: true,
  });

  // Derived state
  readonly displayName = computed(() => {
    const user = this.user();
    if (!user) return null;

    return user.name || user.nickname || user.email || 'User';
  });

  readonly isReady = computed(() => !this.isLoading() && this.isAuthenticated());

  // Auth actions
  login = () => this.auth.loginWithRedirect();

  logout = () =>
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
}

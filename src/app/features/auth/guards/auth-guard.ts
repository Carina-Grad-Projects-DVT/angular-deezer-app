import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  // TODO: Add spinner
  if (auth.isLoading()) {
    return false;
  }

  if (auth.isAuthenticated()) {
    router.navigate(['/search']);
    return false;
  }

  return true;
};

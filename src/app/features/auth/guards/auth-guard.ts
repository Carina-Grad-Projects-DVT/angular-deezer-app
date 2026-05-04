import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // TODO: Replace with real auth check using Deezer OAuth flow details.
  const isAuthenticated = true;

  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

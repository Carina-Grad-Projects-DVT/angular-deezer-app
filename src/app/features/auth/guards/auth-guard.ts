import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // TODO: Replace with real auth check using Deezer Auth Flow details
  const isAuthenticated = false;

  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

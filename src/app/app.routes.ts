import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },

  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/search/pages/search-page/search-page').then((module) => module.SearchPage),
  },
  {
    path: 'artist/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/artist/pages/artist-page/artist-page').then((module) => module.ArtistPage),
  },
  {
    path: 'album/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/album/pages/album-page/album-page').then((module) => module.AlbumPage),
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/playlists/pages/playlists-page/playlists-page').then(
        (module) => module.PlaylistsPage,
      ),
  },

  { path: '**', redirectTo: 'search' },
];

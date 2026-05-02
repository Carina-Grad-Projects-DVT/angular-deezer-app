import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((module) => module.LoginPage),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./features/auth/pages/auth-callback-page/auth-callback-page').then(
        (module) => module.AuthCallbackPage,
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/pages/search-page/search-page').then((module) => module.SearchPage),
  },
  {
    path: 'artist/:id',
    loadComponent: () =>
      import('./features/artist/pages/artist-page/artist-page').then((module) => module.ArtistPage),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./features/album/pages/album-page/album-page').then((module) => module.AlbumPage),
  },
  {
    path: 'playlists',
    loadComponent: () =>
      import('./features/playlists/pages/playlists-page/playlists-page').then(
        (module) => module.PlaylistsPage,
      ),
  },

  { path: '**', redirectTo: 'search' },
];

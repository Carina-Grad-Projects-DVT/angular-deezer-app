import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth-guard';
import { albumPageResolver } from './shared/resolvers/album-page.resolver';
import { artistPageResolver } from './shared/resolvers/artist-page.resolver';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/search/pages/search-page/search-page').then((m) => m.SearchPage),
  },
  {
    path: 'artist/:id',
    canActivate: [authGuard],
    resolve: {
      artistPageData: artistPageResolver,
    },
    loadComponent: () =>
      import('./features/artist/pages/artist-page/artist-page').then((m) => m.ArtistPage),
  },
  {
    path: 'album/:id',
    canActivate: [authGuard],
    resolve: {
      albumPageData: albumPageResolver,
    },
    loadComponent: () =>
      import('./features/album/pages/album-page/album-page').then((m) => m.AlbumPage),
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/playlists/pages/playlists-page/playlists-page').then(
        (m) => m.PlaylistsPage,
      ),
  },

  {
    path: '**',
    redirectTo: 'search',
  },
];

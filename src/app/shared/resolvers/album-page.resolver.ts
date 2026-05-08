import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { AlbumByIdResponse } from '../models/artist.models';
import { DeezerGenre } from '../models/genre.models';
import { ArtistApiService } from '../services/artist-api.service';
import { GenreService } from '../services/genre.service';

export interface AlbumPageResolvedData {
  album: AlbumByIdResponse;
  genre: DeezerGenre | null;
}

export const albumPageResolver: ResolveFn<AlbumPageResolvedData | null> = (route) => {
  const artistApiService = inject(ArtistApiService);
  const genreService = inject(GenreService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (Number.isNaN(id)) {
    void router.navigate(['/search']);
    return of(null);
  }

  return artistApiService.getAlbumById(id).pipe(
    switchMap((album) =>
      genreService.getGenreById(album.genre_id).pipe(
        map((genre) => ({ album, genre })),
        catchError(() => of({ album, genre: null })),
      ),
    ),
    catchError(() => {
      void router.navigate(['/search']);
      return of(null);
    }),
  );
};

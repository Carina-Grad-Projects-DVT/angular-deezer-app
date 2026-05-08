import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { AlbumByArtistResponse, ArtistByIdResponse } from '../models/artist.models';
import { ArtistApiService } from '../services/artist-api.service';

export interface ArtistPageResolvedData {
  artist: ArtistByIdResponse;
  albums: AlbumByArtistResponse[];
}

export const artistPageResolver: ResolveFn<ArtistPageResolvedData | null> = (route) => {
  const artistApiService = inject(ArtistApiService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (Number.isNaN(id)) {
    void router.navigate(['/search']);
    return of(null);
  }

  // forkJoin waits for all observables to finish and only then emits a single value with the results from each one.
  // In this use case, we need the artist details AND albums before page component renders, so forkJoin makes sure both API calls finish before navigation completes.
  return forkJoin({
    artist: artistApiService.getArtistById(id),
    albums: artistApiService.getAlbumsByArtistId(id),
  }).pipe(
    catchError(() => {
      void router.navigate(['/search']);
      return of(null);
    }),
  );
};

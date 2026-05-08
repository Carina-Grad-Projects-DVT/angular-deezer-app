import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { AlbumByIdResponse } from '../models/artist.models';
import { DeezerGenre } from '../models/genre.models';
import { ArtistApiService } from '../services/artist-api.service';
import { GenreService } from '../services/genre.service';
interface AlbumRequestState {
  album: AlbumByIdResponse | null;
  isLoading: boolean;
  errorMessage: string | null;
}

@Injectable({ providedIn: 'root' })
export class AlbumDetailsStore {
  private readonly artistApiService = inject(ArtistApiService);
  private readonly genreService = inject(GenreService);
  private readonly albumId = signal<number | null>(null);
  private readonly albumState = toSignal(
    toObservable(this.albumId).pipe(
      distinctUntilChanged(),
      switchMap((albumId) => {
        if (albumId === null) {
          return of<AlbumRequestState>({
            album: null,
            isLoading: false,
            errorMessage: null,
          });
        }

        return this.artistApiService.getAlbumById(albumId).pipe(
          map(
            (album): AlbumRequestState => ({
              album,
              isLoading: false,
              errorMessage: null,
            }),
          ),
          startWith<AlbumRequestState>({
            album: null,
            isLoading: true,
            errorMessage: null,
          }),
          catchError(() =>
            of<AlbumRequestState>({
              album: null,
              isLoading: false,
              errorMessage: 'Error loading album. Please try again.',
            }),
          ),
        );
      }),
    ),
    {
      initialValue: {
        album: null,
        isLoading: false,
        errorMessage: null,
      },
    },
  );

  readonly album = computed(() => this.albumState().album);
  readonly isLoading = computed(() => this.albumState().isLoading);
  readonly errorMessage = computed(() => this.albumState().errorMessage);
  readonly genre = toSignal(
    toObservable(this.albumState).pipe(
      map((state) => state.album?.genre_id ?? null),
      distinctUntilChanged(),
      switchMap((genreId) => {
        if (genreId === null) {
          return of<DeezerGenre | null>(null);
        }

        return this.genreService.getGenreById(genreId).pipe(
          map((genre): DeezerGenre | null => genre),
          catchError(() => of<DeezerGenre | null>(null)),
        );
      }),
    ),
    {
      initialValue: null,
    },
  );

  loadAlbumById(id: number): void {
    this.albumId.set(id);
  }
}

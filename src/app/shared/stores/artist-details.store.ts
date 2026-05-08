import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { ArtistApiService } from '../services/artist-api.service';
import { AlbumByArtistResponse, ArtistByIdResponse } from '../models/artist.models';
interface ArtistRequestState {
  artist: ArtistByIdResponse | null;
  isLoading: boolean;
  errorMessage: string | null;
}

interface ArtistAlbumsRequestState {
  albums: AlbumByArtistResponse[];
  isLoading: boolean;
  hasLoadedAlbums: boolean;
  errorMessage: string | null;
}

@Injectable({ providedIn: 'root' })
export class ArtistDetailsStore {
  private readonly artistApiService = inject(ArtistApiService);
  private readonly artistId = signal<number | null>(null);
  private readonly resolvedData = signal<{
    artist: ArtistByIdResponse;
    albums: AlbumByArtistResponse[];
  } | null>(null);
  private readonly artistState = toSignal(
    toObservable(this.artistId).pipe(
      distinctUntilChanged(),
      switchMap((artistId) => {
        if (artistId === null) {
          return of<ArtistRequestState>({
            artist: null,
            isLoading: false,
            errorMessage: null,
          });
        }

        return this.artistApiService.getArtistById(artistId).pipe(
          map(
            (artist): ArtistRequestState => ({
              artist,
              isLoading: false,
              errorMessage: null,
            }),
          ),
          startWith<ArtistRequestState>({
            artist: null,
            isLoading: true,
            errorMessage: null,
          }),
          catchError(() =>
            of<ArtistRequestState>({
              artist: null,
              isLoading: false,
              errorMessage: 'Error loading artist profile. Please try again.',
            }),
          ),
        );
      }),
    ),
    {
      initialValue: {
        artist: null,
        isLoading: false,
        errorMessage: null,
      },
    },
  );
  private readonly albumsState = toSignal(
    toObservable(this.artistId).pipe(
      distinctUntilChanged(),
      switchMap((artistId) => {
        if (artistId === null) {
          return of<ArtistAlbumsRequestState>({
            albums: [],
            isLoading: false,
            hasLoadedAlbums: false,
            errorMessage: null,
          });
        }

        return this.artistApiService.getAlbumsByArtistId(artistId).pipe(
          map(
            (albums): ArtistAlbumsRequestState => ({
              albums,
              isLoading: false,
              hasLoadedAlbums: true,
              errorMessage: null,
            }),
          ),
          startWith<ArtistAlbumsRequestState>({
            albums: [],
            isLoading: true,
            hasLoadedAlbums: false,
            errorMessage: null,
          }),
          catchError(() =>
            of<ArtistAlbumsRequestState>({
              albums: [],
              isLoading: false,
              hasLoadedAlbums: true,
              errorMessage: 'Error loading artist albums. Please try again.',
            }),
          ),
        );
      }),
    ),
    {
      initialValue: {
        albums: [],
        isLoading: false,
        hasLoadedAlbums: false,
        errorMessage: null,
      },
    },
  );

  readonly artist = computed(() => this.resolvedData()?.artist ?? this.artistState().artist);
  readonly albums = computed(() => this.resolvedData()?.albums ?? this.albumsState().albums);
  readonly hasLoadedAlbums = computed(() =>
    this.resolvedData() ? true : this.albumsState().hasLoadedAlbums,
  );
  readonly errorMessage = computed(() =>
    this.resolvedData()
      ? null
      : (this.artistState().errorMessage ?? this.albumsState().errorMessage),
  );
  readonly isLoading = computed(() =>
    this.resolvedData() ? false : this.artistState().isLoading || this.albumsState().isLoading,
  );

  loadArtistPageData(id: number): void {
    this.resolvedData.set(null);
    this.artistId.set(id);
  }

  setResolvedArtistPageData(artist: ArtistByIdResponse, albums: AlbumByArtistResponse[]): void {
    this.resolvedData.set({ artist, albums });
  }
}

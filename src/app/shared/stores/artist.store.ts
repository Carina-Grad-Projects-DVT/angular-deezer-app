import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { ArtistApiService } from '../services/artist-api.service';
import { ArtistByNameResponse } from '../models/artist.models';
interface ArtistSearchState {
  settledQuery: string;
  artists: ArtistByNameResponse[];
  isLoading: boolean;
  errorMessage: string | null;
}

@Injectable({ providedIn: 'root' })
export class ArtistSearchStore {
  private readonly artistApiService = inject(ArtistApiService);
  readonly query = signal('');
  private readonly searchState = toSignal(
    toObservable(this.query).pipe(
      map((query) => query.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((trimmedQuery) => {
        if (!trimmedQuery) {
          return of<ArtistSearchState>({
            settledQuery: '',
            artists: [],
            isLoading: false,
            errorMessage: null,
          });
        }

        return this.artistApiService.searchArtists(trimmedQuery).pipe(
          map(
            (artists): ArtistSearchState => ({
              settledQuery: trimmedQuery,
              artists,
              isLoading: false,
              errorMessage: null,
            }),
          ),
          startWith<ArtistSearchState>({
            settledQuery: trimmedQuery,
            artists: [],
            isLoading: true,
            errorMessage: null,
          }),
          catchError(() =>
            of<ArtistSearchState>({
              settledQuery: trimmedQuery,
              artists: [],
              isLoading: false,
              errorMessage: 'Error fetching artists. Please try again.',
            }),
          ),
        );
      }),
    ),
    {
      initialValue: {
        settledQuery: '',
        artists: [],
        isLoading: false,
        errorMessage: null,
      },
    },
  );
  readonly settledQuery = computed(() => this.searchState().settledQuery);
  readonly artists = computed(() => this.searchState().artists);
  readonly isLoading = computed(() => this.searchState().isLoading);
  readonly errorMessage = computed(() => this.searchState().errorMessage);
  readonly hasSearchResults = computed(() => this.artists().length > 0);
  readonly isSearchEmptyState = computed(
    () =>
      !this.isLoading() &&
      !this.errorMessage() &&
      this.settledQuery().length > 0 &&
      this.artists().length === 0,
  );

  setQuery(value: string): void {
    this.query.set(value);
  }
}

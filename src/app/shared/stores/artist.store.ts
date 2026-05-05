import { Injectable, Injector, computed, effect, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistApiService } from '../services/artist-api.service';
import { ArtistbyIDResponse, ArtistByNameResponse, DeezerAlbum } from '../models/artist.models';

@Injectable({ providedIn: 'root' })
export class ArtistStore {
  private readonly artistApiService = inject(ArtistApiService);
  private readonly injector = inject(Injector);
  readonly query = signal('');
  readonly artists = signal<ArtistByNameResponse[]>([]);
  readonly selectedArtist = signal<ArtistbyIDResponse | null>(null);
  readonly hasLoadedAlbums = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly hasSearchResults = computed(() => this.artists().length > 0);
  readonly isSearchEmptyState = computed(
    () =>
      !this.isLoading() &&
      !this.errorMessage() &&
      this.query().trim().length > 0 &&
      this.artists().length === 0,
  );
  private readonly debouncedSearchEffect = effect(
    (onCleanup) => {
      const trimmedQuery = this.query().trim();
      let searchSubscription: Subscription | undefined;

      this.errorMessage.set(null);

      const debounceTimer = setTimeout(() => {
        if (!trimmedQuery) {
          this.isLoading.set(false);
          this.artists.set([]);
          return;
        }

        this.isLoading.set(true);
        searchSubscription = this.artistApiService.searchArtists(trimmedQuery).subscribe({
          next: (artists) => this.artists.set(artists),
          error: () => {
            this.errorMessage.set('Error fetching artists. Please try again.');
            this.artists.set([]);
            this.isLoading.set(false);
          },
          complete: () => this.isLoading.set(false),
        });
      }, 350);

      onCleanup(() => {
        clearTimeout(debounceTimer);
        searchSubscription?.unsubscribe();
      });
    },
    { injector: this.injector },
  );

  setQuery(value: string): void {
    this.query.set(value);
  }

  loadArtistById(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.artistApiService.getArtistById(id).subscribe({
      next: (artist) => this.selectedArtist.set(artist),
      error: () => {
        this.errorMessage.set('Error loading artist profile. Please try again.');
        this.selectedArtist.set(null);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  clearSelectedArtist(): void {
    this.selectedArtist.set(null);
  }

  readonly albums = signal<DeezerAlbum[]>([]);

  loadAlbumsByArtistId(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.hasLoadedAlbums.set(false);

    this.artistApiService.getAlbumsByArtistId(id).subscribe({
      next: (albums) => {
        this.albums.set(albums);
        this.hasLoadedAlbums.set(true);
      },
      error: () => {
        this.errorMessage.set('Error loading artist albums. Please try again.');
        this.albums.set([]);
        this.hasLoadedAlbums.set(true);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}

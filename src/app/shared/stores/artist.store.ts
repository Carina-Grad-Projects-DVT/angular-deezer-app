import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistApiService } from '../services/artist-api.service';
import { ArtistByNameResponse } from '../models/artist.models';

@Injectable({ providedIn: 'root' })
export class ArtistSearchStore {
  private readonly artistApiService = inject(ArtistApiService);
  readonly query = signal('');
  readonly artists = signal<ArtistByNameResponse[]>([]);
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

  constructor() {
    effect((onCleanup) => {
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
    });
  }

  setQuery(value: string): void {
    this.query.set(value);
  }
}

import { Injectable, Injector, computed, effect, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistSearchResult } from '../models/search.models';
import { ArtistSearchService } from '../services/artist-search.service';

@Injectable({ providedIn: 'root' })
export class SearchStore {
  private readonly artistSearchService = inject(ArtistSearchService);
  private readonly injector = inject(Injector);
  readonly query = signal('');
  readonly artists = signal<ArtistSearchResult[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly hasResults = computed(() => this.artists().length > 0);
  readonly isEmptyState = computed(
    () =>
      !this.isLoading() &&
      !this.errorMessage() &&
      this.query().trim().length > 0 &&
      this.artists().length === 0,
  );
  private readonly debouncedSearchEffect = effect(
    (onCleanup) => {
      const currentQuery = this.query();
      const trimmedQuery = currentQuery.trim();
      let searchSubscription: Subscription | undefined;

      this.errorMessage.set(null);

      const debounceTimer = setTimeout(() => {
        if (!trimmedQuery) {
          this.isLoading.set(false);
          this.artists.set([]);
          return;
        }

        this.isLoading.set(true);
        searchSubscription = this.artistSearchService.searchArtists(trimmedQuery).subscribe({
          next: (artists) => {
            this.artists.set(artists);
          },
          error: () => {
            this.errorMessage.set('Error fetching artists. Please try again.');
            this.artists.set([]);
            this.isLoading.set(false);
          },
          complete: () => {
            this.isLoading.set(false);
          },
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
}

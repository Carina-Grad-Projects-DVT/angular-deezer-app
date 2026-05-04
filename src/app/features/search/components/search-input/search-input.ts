import { Component, Injector, OnInit, effect, inject, output, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ArtistSearchService } from '../../services/artist-search.service';
import { Subscription } from 'rxjs';
import { ArtistSearchResult } from '../../models/search.models';

// nice to have TODO: Add autocomplete

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
  imports: [InputTextModule],
})
export class SearchInput implements OnInit {
  private readonly artistService = inject(ArtistSearchService);
  private readonly injector = inject(Injector);
  readonly query = signal('');
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly artistsChange = output<ArtistSearchResult[]>();
  readonly isLoadingChange = output<boolean>();
  readonly errorMessageChange = output<string | null>();
  readonly queryChange = output<string>();

  ngOnInit(): void {
    effect(
      (onCleanup) => {
        const currentQuery = this.query();
        const trimmedQuery = currentQuery.trim();
        let searchSubscription: Subscription | undefined;

        this.queryChange.emit(currentQuery);
        this.errorMessage.set(null);
        this.errorMessageChange.emit(null);

        const debounceTimer = setTimeout(() => {
          if (!trimmedQuery) {
            this.isLoading.set(false);
            this.isLoadingChange.emit(false);
            this.artistsChange.emit([]);
            return;
          }
          this.isLoading.set(true);
          this.isLoadingChange.emit(true);
          searchSubscription = this.artistService.searchArtists(trimmedQuery).subscribe({
            next: (artists) => {
              this.artistsChange.emit(artists);
            },
            error: () => {
              this.errorMessage.set('Error fetching artists. Please try again.');
              this.errorMessageChange.emit('Error fetching artists. Please try again.');
              this.artistsChange.emit([]);
              this.isLoading.set(false);
              this.isLoadingChange.emit(false);
            },
            complete: () => {
              this.isLoading.set(false);
              this.isLoadingChange.emit(false);
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
  }
  onInput(value: string): void {
    this.query.set(value);
  }
}

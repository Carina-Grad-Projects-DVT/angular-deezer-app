import { Component, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { ArtistSearchResult } from '../../models/search.models';
import { SearchResultsCard } from '../../components/search-results-cards/search-results-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput, SearchResultsCard],
})
export class SearchPage {
  readonly query = signal('');
  readonly artists = signal<ArtistSearchResult[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  onQueryChange(query: string): void {
    this.query.set(query);
  }

  onArtistsChange(artists: ArtistSearchResult[]): void {
    this.artists.set(artists);
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }

  onErrorMessageChange(message: string | null): void {
    this.errorMessage.set(message);
  }
}

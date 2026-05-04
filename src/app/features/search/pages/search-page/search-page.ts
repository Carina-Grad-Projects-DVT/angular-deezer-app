import { Component, inject } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { SearchResultsCard } from '../../components/search-results-cards/search-results-card';
import { SearchStore } from '../../stores/search.store';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput, SearchResultsCard],
})
export class SearchPage {
  readonly searchStore = inject(SearchStore);
}

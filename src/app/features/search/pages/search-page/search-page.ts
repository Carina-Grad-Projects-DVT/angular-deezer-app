import { Component, inject } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { SearchStore } from '../../stores/search.store';
import { ResultsCard } from '../../../../shared/components/results-card/results-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput, ResultsCard],
})
export class SearchPage {
  readonly searchStore = inject(SearchStore);
}

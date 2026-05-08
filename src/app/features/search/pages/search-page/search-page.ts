import { Component, inject } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { ResultsCard } from '../../../../shared/components/results-card/results-card';
import { AsyncStateFeedback } from '../../../../shared/components/async-state-feedback/async-state-feedback';
import { ArtistSearchStore } from '../../../../shared/stores/artist.store';

// Additional changes that could have been made :
// - Autocomplete when typing
// - Search on enter
// - Virtual scroll

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput, ResultsCard, AsyncStateFeedback],
})
export class SearchPage {
  readonly artistSearchStore = inject(ArtistSearchStore);
}

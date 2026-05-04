import { Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { SearchResultsCard } from '../../components/search-results-cards/search-results-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput, SearchResultsCard],
})
export class SearchPage {}

import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ArtistSearchResult } from '../../models/search.models';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.html',
  standalone: true,
  imports: [CardModule],
})
export class SearchResultsCard {
  readonly artist = input.required<ArtistSearchResult>();
}

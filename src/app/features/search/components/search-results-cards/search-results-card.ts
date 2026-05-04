import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ArtistByNameResponse } from '../../../../shared/models/artist.models';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.html',
  standalone: true,
  imports: [CardModule],
})
export class SearchResultsCard {
  readonly artist = input.required<ArtistByNameResponse>();
}

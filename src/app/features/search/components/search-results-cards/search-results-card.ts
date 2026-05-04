import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.html',
  standalone: true,
  imports: [CardModule, ButtonModule],
})
export class SearchResultsCard {}

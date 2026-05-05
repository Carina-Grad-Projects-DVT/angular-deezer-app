import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.html',
  standalone: true,
  imports: [CardModule, RouterLink],
})
export class ResultsCard {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly imageUrl = input.required<string>();
  readonly imageAlt = input.required<string>();
  readonly routeLink = input<string | readonly (string | number)[] | null>(null);
  readonly ariaLabel = input<string | null>(null);
}

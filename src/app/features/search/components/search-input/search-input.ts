import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ArtistSearchStore } from '../../../../shared/stores/artist.store';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
  imports: [InputTextModule],
})
export class SearchInput {
  readonly artistSearchStore = inject(ArtistSearchStore);
  onInput(value: string): void {
    this.artistSearchStore.setQuery(value);
  }
}

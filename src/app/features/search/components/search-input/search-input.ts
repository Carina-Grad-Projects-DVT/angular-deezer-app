import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { SearchStore } from '../../stores/search.store';

// nice to have TODO: Add autocomplete

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
  imports: [InputTextModule],
})
export class SearchInput {
  readonly searchStore = inject(SearchStore);
  onInput(value: string): void {
    this.searchStore.setQuery(value);
  }
}

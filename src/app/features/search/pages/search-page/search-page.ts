import { Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.html',
  imports: [SearchInput],
})
export class SearchPage {}

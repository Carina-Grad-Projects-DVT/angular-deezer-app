import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
  imports: [InputTextModule, ReactiveFormsModule],
})
export class SearchInput implements OnInit {
  artistSearchControl = new FormControl('');
  // private readonly api = inject(whateverService);

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      query: new FormControl(''),
    });
  }
}

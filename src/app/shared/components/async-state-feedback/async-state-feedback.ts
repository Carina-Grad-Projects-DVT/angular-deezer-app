import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// AI suggested using this reusable component, it was not my own idea. Kudos to chatgpt
@Component({
  selector: 'app-async-state-feedback',
  standalone: true,
  templateUrl: './async-state-feedback.html',
  imports: [ProgressSpinnerModule],
})
export class AsyncStateFeedback {
  readonly isLoading = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly loadingMessage = input('Searching ...');
}

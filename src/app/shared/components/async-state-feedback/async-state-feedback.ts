import { Component, input } from '@angular/core';

// Kudos to AI for suggesting this component

@Component({
  selector: 'app-async-state-feedback',
  standalone: true,
  templateUrl: './async-state-feedback.html',
})
export class AsyncStateFeedback {
  readonly isLoading = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly loadingMessage = input('Searching ...');
}

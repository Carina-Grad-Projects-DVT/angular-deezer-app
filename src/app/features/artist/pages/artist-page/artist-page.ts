import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ResultsCard } from '../../../../shared/components/results-card/results-card';
import { AsyncStateFeedback } from '../../../../shared/components/async-state-feedback/async-state-feedback';
import { ActivatedRoute } from '@angular/router';
import { ArtistDetailsStore } from '../../../../shared/stores/artist-details.store';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.html',
  imports: [CardModule, ResultsCard, AsyncStateFeedback],
})
export class ArtistPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly artistDetailsStore = inject(ArtistDetailsStore);

  ngOnInit(): void {
    // gets id from route param
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      return;
    }

    this.artistDetailsStore.loadArtistPageData(id);
  }
}

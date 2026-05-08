import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ResultsCard } from '../../../../shared/components/results-card/results-card';
import { AsyncStateFeedback } from '../../../../shared/components/async-state-feedback/async-state-feedback';
import { ActivatedRoute } from '@angular/router';
import { ArtistDetailsStore } from '../../../../shared/stores/artist-details.store';
import { ArtistPageResolvedData } from '../../../../shared/resolvers/artist-page.resolver';
import { FormatBigNumberPipe } from '../../../../shared/pipes/formatBigNumber.pipe';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.html',
  imports: [CardModule, ResultsCard, AsyncStateFeedback, FormatBigNumberPipe],
})
export class ArtistPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly artistDetailsStore = inject(ArtistDetailsStore);

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data[
      'artistPageData'
    ] as ArtistPageResolvedData | null;

    if (resolvedData) {
      this.artistDetailsStore.setResolvedArtistPageData(resolvedData.artist, resolvedData.albums);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) return;

    this.artistDetailsStore.loadArtistPageData(id);
  }
}

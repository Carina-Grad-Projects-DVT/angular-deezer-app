import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ResultsCard } from '../../../../shared/components/results-card/results-card';
import { ActivatedRoute } from '@angular/router';
import { ArtistStore } from '../../../../shared/stores/artist.store';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  templateUrl: './artist-page.html',
  imports: [CardModule, ResultsCard],
})
export class ArtistPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly artistStore = inject(ArtistStore);

  ngOnInit(): void {
    // gets id from route param
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      return;
    }

    this.artistStore.loadArtistById(id);
    this.artistStore.loadAlbumsByArtistId(id);
  }
}

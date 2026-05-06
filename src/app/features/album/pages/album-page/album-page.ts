import { ArtistStore } from '../../../../shared/stores/artist.store';
import { CardModule } from 'primeng/card';
import { GenreService } from '../../../../shared/services/genre.service';
import { DeezerGenre } from '../../../../shared/models/genre.models';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackList } from '../../components/track-list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.html',
  imports: [CardModule, TrackList, DatePipe],
})
export class AlbumPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly artistStore = inject(ArtistStore);
  readonly genreService = inject(GenreService);

  album = this.artistStore.selectedAlbum;
  genre = signal<DeezerGenre | null>(null);
  private genreEffect = effect(() => {
    const album = this.album();
    if (!album) {
      this.genre.set(null);
      return;
    }
    const genreSignal = this.genreService.getGenreSignal(album.genre_id);
    this.genre.set(genreSignal());
  });
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) return;
    this.artistStore.loadAlbumById(id);
  }
}

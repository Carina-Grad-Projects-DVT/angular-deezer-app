import { ArtistStore } from '../../../../shared/stores/artist.store';
import { CardModule } from 'primeng/card';
import { GenreService } from '../../../../shared/services/genre.service';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
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

  album = this.artistStore.selectedAlbum; // Signal<AlbumById | null>

  genre = computed(() => {
    const album = this.album();
    if (!album) return null;
    return this.genreService.getGenreSignal(album.genre_id)();
  });

  private genreEffect = effect(() => {
    const album = this.album();
    if (album) {
      this.genreService.getGenreSignal(album.genre_id);
    }
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) return;
    this.artistStore.loadAlbumById(id);
  }
}

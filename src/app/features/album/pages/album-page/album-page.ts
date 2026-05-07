import { CardModule } from 'primeng/card';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackList } from '../../components/track-list';
import { DatePipe } from '@angular/common';
import { AsyncStateFeedback } from '../../../../shared/components/async-state-feedback/async-state-feedback';
import { PlaylistStore } from '../../../../shared/stores/playlist.store';
import { AlbumDetailsStore } from '../../../../shared/stores/album-details.store';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.html',
  imports: [CardModule, TrackList, DatePipe, AsyncStateFeedback],
})
export class AlbumPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly albumDetailsStore = inject(AlbumDetailsStore);
  readonly playlistStore = inject(PlaylistStore);
  readonly album = this.albumDetailsStore.album;
  readonly genre = this.albumDetailsStore.genre;
  readonly isLoading = this.albumDetailsStore.isLoading;
  readonly errorMessage = this.albumDetailsStore.errorMessage;
  readonly playlists = this.playlistStore.playlists;
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) return;
    this.albumDetailsStore.loadAlbumById(id);
  }
}

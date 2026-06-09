import { CardModule } from 'primeng/card';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackList } from '../../components/track-list';
import { DatePipe } from '@angular/common';
import { AsyncStateFeedback } from '../../../../shared/components/async-state-feedback/async-state-feedback';
import { PlaylistStore } from '../../../../shared/stores/playlist.store';
import { AlbumDetailsStore } from '../../../../shared/stores/album-details.store';
import { AlbumPageResolvedData } from '../../../../shared/resolvers/album-page.resolver';

@Component({
  selector: 'app-album-page',
  standalone: true,
  templateUrl: './album-page.html',
  imports: [CardModule, TrackList, DatePipe, AsyncStateFeedback, RouterLink],
})
export class AlbumPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly albumDetailsStore = inject(AlbumDetailsStore);
  readonly playlistStore = inject(PlaylistStore);
  readonly album = this.albumDetailsStore.album;
  readonly genre = this.albumDetailsStore.resolvedGenre;
  readonly isLoading = this.albumDetailsStore.isLoading;
  readonly errorMessage = this.albumDetailsStore.errorMessage;
  readonly playlists = this.playlistStore.playlists;
  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['albumPageData'] as AlbumPageResolvedData | null;
    if (resolvedData) {
      this.albumDetailsStore.setResolvedAlbumPageData(resolvedData.album, resolvedData.genre);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) return;
    this.albumDetailsStore.loadAlbumById(id);
  }
}

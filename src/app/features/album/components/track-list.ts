import { Component, computed, inject, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlbumTrackResponse } from '../../../shared/models/artist.models';
import { formatDuration } from '../../../shared/utils/format-duration';
import { PlaylistStore } from '../../../shared/stores/playlist.store';
import { Playlist } from '../../../../../db';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-track-list',
  standalone: true,
  templateUrl: './track-list.html',
  imports: [TableModule, SplitButtonModule],
})
export class TrackList {
  private readonly playlistStore = inject(PlaylistStore);
  readonly tracks = input<AlbumTrackResponse[]>([]);
  readonly playlists = input<Playlist[]>([]);
  readonly artistName = input<string>('');
  readonly albumTitle = input<string>('');
  readonly formatDuration = formatDuration;
  readonly hasPlaylists = computed(() => this.playlists().length > 0);
  readonly playlistMenuItemsByTrackId = computed(() => {
    const playlists = this.playlists();

    return new Map<number, MenuItem[]>(
      this.tracks().map((track) => [
        track.id,
        playlists.map((playlist) => ({
          label: playlist.name,
          command: () => {
            void this.addTrackToSelectedPlaylist(track, playlist.id);
          },
        })),
      ]),
    );
  });

  getPlaylistMenuItems(trackId: number): MenuItem[] {
    return this.playlistMenuItemsByTrackId().get(trackId) ?? [];
  }

  async onSplitButtonClick(track: AlbumTrackResponse): Promise<void> {
    const firstPlaylist = this.playlists()[0];
    if (!firstPlaylist) return;

    await this.addTrackToSelectedPlaylist(track, firstPlaylist.id);
  }

  async addTrackToSelectedPlaylist(
    track: AlbumTrackResponse,
    targetPlaylistId: number,
  ): Promise<void> {
    await this.playlistStore.addTrackToPlaylist(
      targetPlaylistId,
      track,
      this.artistName(),
      this.albumTitle(),
    );
  }
}

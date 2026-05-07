import { Component, inject, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PlaylistTrack } from '../../../../../../db';
import { PlaylistStore } from '../../../../shared/stores/playlist.store';
import { formatDuration } from '../../../../shared/utils/format-duration';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playlist-tracks',
  standalone: true,
  templateUrl: './playlist-tracks.html',
  imports: [TableModule, ButtonModule],
})
export class PlaylistTracks {
  private readonly playlistStore = inject(PlaylistStore);
  readonly tracks = input<PlaylistTrack[]>([]);
  readonly formatDuration = formatDuration;

  async removeTrack(track: PlaylistTrack): Promise<void> {
    await this.playlistStore.removeTrackFromPlaylist(track.playlistId, track.id);
  }
}

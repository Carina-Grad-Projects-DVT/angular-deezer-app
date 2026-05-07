import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { formatDuration } from '../../../../shared/utils/format-duration';
import { PlaylistStore } from '../../../../shared/stores/playlist.store';
import { PlaylistTracks } from '../../components/playlist-tracks/playlist-tracks';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playlists-page',
  standalone: true,
  templateUrl: './playlists-page.html',
  imports: [AccordionModule, PlaylistTracks, ButtonModule],
})
export class PlaylistsPage {
  private readonly playlistStore = inject(PlaylistStore);
  newPlaylistName = '';
  editingPlaylistId: number | null = null;
  renameValue = '';
  readonly formatDuration = formatDuration;
  readonly playlistsWithStats = this.playlistStore.playlistsWithStats;

  async addNewPlaylist() {
    await this.playlistStore.addPlaylist(this.newPlaylistName);
    this.newPlaylistName = '';
  }

  async deletePlaylist(playlistId: number) {
    await this.playlistStore.deletePlaylist(playlistId);

    if (this.editingPlaylistId === playlistId) {
      this.cancelRename();
    }
  }

  startRename(playlistId: number, currentName: string) {
    this.editingPlaylistId = playlistId;
    this.renameValue = currentName;
  }

  cancelRename() {
    this.editingPlaylistId = null;
    this.renameValue = '';
  }

  async saveRename(playlistId: number) {
    await this.playlistStore.renamePlaylist(playlistId, this.renameValue);
    this.cancelRename();
  }
}

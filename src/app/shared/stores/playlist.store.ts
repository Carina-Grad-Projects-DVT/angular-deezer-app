import { computed, DestroyRef, Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Subscription } from 'rxjs';
import { db, Playlist, PlaylistTrack } from '../../../../db';
import { AlbumTrackResponse } from '../models/artist.models';

// TODO: Put in model file
export interface PlaylistWithStats {
  playlist: Playlist;
  tracks: PlaylistTrack[];
  trackCount: number;
  totalDuration: number;
}

@Injectable({ providedIn: 'root' })
export class PlaylistStore {
  private readonly destroyRef = inject(DestroyRef);
  private playlistSubscription?: Subscription;
  private playlistTracksSubscription?: Subscription;
  private readonly playlistsState = signal<Playlist[]>([]);
  private readonly playlistTracksState = signal<PlaylistTrack[]>([]);
  readonly playlists = this.playlistsState.asReadonly();
  readonly playlistTracks = this.playlistTracksState.asReadonly();
  readonly playlistsWithStats = computed<PlaylistWithStats[]>(() => {
    const tracksByPlaylistId = new Map<number, PlaylistTrack[]>();

    for (const track of this.playlistTracks()) {
      const tracks = tracksByPlaylistId.get(track.playlistId) ?? [];
      tracks.push(track);
      tracksByPlaylistId.set(track.playlistId, tracks);
    }

    return this.playlists().map((playlist) => {
      const tracks = tracksByPlaylistId.get(playlist.id) ?? [];

      return {
        playlist,
        tracks,
        trackCount: tracks.length,
        totalDuration: tracks.reduce((total, track) => total + track.duration, 0),
      };
    });
  });
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  private readonly initStore = this.setupStore();

  private setupStore(): void {
    this.watchPlaylists();
    this.watchPlaylistTracks();

    this.destroyRef.onDestroy(() => {
      this.playlistSubscription?.unsubscribe();
      this.playlistTracksSubscription?.unsubscribe();
    });
  }

  private watchPlaylists(): void {
    this.playlistSubscription = from(liveQuery(() => db.playlists.toArray())).subscribe({
      next: (playlists) => {
        this.playlistsState.set(playlists);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error loading playlists.');
        this.isLoading.set(false);
      },
    });
  }

  private watchPlaylistTracks(): void {
    this.playlistTracksSubscription = from(liveQuery(() => db.playlistTracks.toArray())).subscribe({
      next: (playlistTracks) => {
        this.playlistTracksState.set(playlistTracks);
      },
      error: () => {
        this.errorMessage.set('Error loading playlist tracks.');
      },
    });
  }

  async addPlaylist(rawName: string): Promise<void> {
    const name = rawName.trim();
    if (!name) return;

    this.errorMessage.set(null);
    await db.playlists.add({
      name,
      createdAt: new Date().toISOString(),
    });
  }

  async renamePlaylist(playlistId: number, rawName: string): Promise<void> {
    const name = rawName.trim();
    if (!name) return;

    this.errorMessage.set(null);
    await db.playlists.update(playlistId, { name });
  }

  async deletePlaylist(playlistId: number): Promise<void> {
    this.errorMessage.set(null);
    await db.transaction('rw', db.playlists, db.playlistTracks, async () => {
      await db.playlistTracks.where('playlistId').equals(playlistId).delete();
      await db.playlists.delete(playlistId);
    });
  }

  async addTrackToPlaylist(
    playlistId: number,
    track: AlbumTrackResponse,
    artistName = '',
    albumTitle = '',
  ): Promise<void> {
    this.errorMessage.set(null);

    const existing = await db.playlistTracks
      .where('[playlistId+id]')
      .equals([playlistId, track.id])
      .first();

    if (existing) return;

    await db.playlistTracks.add({
      playlistId,
      id: track.id,
      title: track.title,
      duration: track.duration,
      preview: track.preview,
      track_position: track.track_position,
      type: 'track',
      artistName,
      albumTitle,
      addedAt: new Date().toISOString(),
    });
  }

  async removeTrackFromPlaylist(playlistId: number, trackId: number): Promise<void> {
    this.errorMessage.set(null);
    await db.playlistTracks.where('[playlistId+id]').equals([playlistId, trackId]).delete();
  }

  getTracksForPlaylist(playlistId: number): PlaylistTrack[] {
    return this.playlistTracks().filter((track) => track.playlistId === playlistId);
  }

  getPlaylistTrackCount(playlistId: number): number {
    return this.getTracksForPlaylist(playlistId).length;
  }

  getPlaylistTotalDuration(playlistId: number): number {
    return this.getTracksForPlaylist(playlistId).reduce(
      (total, track) => total + track.duration,
      0,
    );
  }
}

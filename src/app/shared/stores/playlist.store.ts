import { Injectable, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { catchError, from, map, of, startWith } from 'rxjs';
import { db, Playlist, PlaylistTrack } from '../../../../db';
import { AlbumTrackResponse } from '../models/artist.models';
interface PlaylistCollectionState {
  playlists: Playlist[];
  isLoading: boolean;
  errorMessage: string | null;
}

interface PlaylistTrackCollectionState {
  playlistTracks: PlaylistTrack[];
  errorMessage: string | null;
}

@Injectable({ providedIn: 'root' })
export class PlaylistStore {
  // tracks write-operation errors (create/rename/delete playlist, add/remove track) seperate from dexie resulting in clearer errors
  private readonly mutationErrorMessage = signal<string | null>(null);
  private readonly playlistsState = toSignal(
    from(liveQuery(() => db.playlists.toArray())).pipe(
      map(
        (playlists): PlaylistCollectionState => ({
          playlists,
          isLoading: false,
          errorMessage: null,
        }),
      ),
      startWith<PlaylistCollectionState>({
        playlists: [],
        isLoading: true,
        errorMessage: null,
      }),
      catchError(() =>
        of<PlaylistCollectionState>({
          playlists: [],
          isLoading: false,
          errorMessage: 'Error loading playlists.',
        }),
      ),
    ),
    {
      initialValue: {
        playlists: [],
        isLoading: true,
        errorMessage: null,
      },
    },
  );
  private readonly playlistTracksState = toSignal(
    from(liveQuery(() => db.playlistTracks.toArray())).pipe(
      map(
        (playlistTracks): PlaylistTrackCollectionState => ({
          playlistTracks,
          errorMessage: null,
        }),
      ),
      startWith<PlaylistTrackCollectionState>({
        playlistTracks: [],
        errorMessage: null,
      }),
      catchError(() =>
        of<PlaylistTrackCollectionState>({
          playlistTracks: [],
          errorMessage: 'Error loading playlist tracks.',
        }),
      ),
    ),
    {
      initialValue: {
        playlistTracks: [],
        errorMessage: null,
      },
    },
  );
  readonly playlists = computed(() => this.playlistsState().playlists);
  readonly playlistTracks = computed(() => this.playlistTracksState().playlistTracks);
  readonly isLoading = computed(() => this.playlistsState().isLoading);
  readonly errorMessage = computed(
    () =>
      this.mutationErrorMessage() ??
      this.playlistsState().errorMessage ??
      this.playlistTracksState().errorMessage,
  );

  async addPlaylist(rawName: string): Promise<void> {
    const name = rawName.trim();
    if (!name) return;
    this.mutationErrorMessage.set(null);
    try {
      await db.playlists.add({
        name,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      this.mutationErrorMessage.set('Error creating playlist.');
      throw error;
    }
  }

  async renamePlaylist(playlistId: number, rawName: string): Promise<void> {
    const name = rawName.trim();
    if (!name) return;
    this.mutationErrorMessage.set(null);
    try {
      await db.playlists.update(playlistId, { name });
    } catch (error) {
      this.mutationErrorMessage.set('Error renaming playlist.');
      throw error;
    }
  }

  async deletePlaylist(playlistId: number): Promise<void> {
    this.mutationErrorMessage.set(null);
    try {
      await db.transaction('rw', db.playlists, db.playlistTracks, async () => {
        await db.playlistTracks.where('playlistId').equals(playlistId).delete();
        await db.playlists.delete(playlistId);
      });
    } catch (error) {
      this.mutationErrorMessage.set('Error deleting playlist.');
      throw error;
    }
  }

  async addTrackToPlaylist(
    playlistId: number,
    track: AlbumTrackResponse,
    artistName = '',
    albumTitle = '',
  ): Promise<void> {
    this.mutationErrorMessage.set(null);

    try {
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
    } catch (error) {
      this.mutationErrorMessage.set('Error adding track to playlist.');
      throw error;
    }
  }

  async removeTrackFromPlaylist(playlistId: number, trackId: number): Promise<void> {
    this.mutationErrorMessage.set(null);
    try {
      await db.playlistTracks.where('[playlistId+id]').equals([playlistId, trackId]).delete();
    } catch (error) {
      this.mutationErrorMessage.set('Error removing track from playlist.');
      throw error;
    }
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

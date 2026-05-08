import Dexie, { type EntityTable } from 'dexie';
import { AlbumTrackResponse } from './src/app/shared/models/artist.models';

export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
}

export interface PlaylistTrack extends AlbumTrackResponse {
  entryId?: number;
  playlistId: number;
  artistName: string;
  albumTitle: string;
  addedAt: string;
}

const db = new Dexie('AngularDeezerApp') as Dexie & {
  playlists: EntityTable<Playlist, 'id'>;
  playlistTracks: EntityTable<PlaylistTrack, 'entryId'>;
};

db.version(1).stores({
  playlists: '++id, name, createdAt',
  playlistTracks: '++id, playlistId, [playlistId+id]',
});
db.version(2).stores({
  playlists: '++id, name, createdAt',
  playlistTracks: null,
});
db.version(3).stores({
  playlists: '++id, name, createdAt',
  playlistTracks: '++entryId, playlistId, id, [playlistId+id]',
});

// Sample data
db.on('populate', async () => {
  const playlistId = await db.playlists.add({
    name: 'Example playlist',
    createdAt: new Date().toISOString(),
  });
  await db.playlistTracks.bulkAdd([
    {
      playlistId,
      id: 3135556,
      title: 'Harder, Better, Faster, Stronger',
      duration: 224,
      preview: 'https://cdnt-preview.dzcdn.net/api/1/1/7/5/5/0/7550.mp3',
      track_position: 1,
      type: 'track',
      artistName: 'Daft Punk',
      albumTitle: 'Discovery',
      addedAt: new Date().toISOString(),
    },
  ]);
});

export { db };

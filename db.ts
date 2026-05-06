import Dexie, { type EntityTable } from 'dexie';

export interface Playlist {
  id: number;
  name: string;
  createdAt: string;
}

// TODO Afterwards : Check if I need all the fields
export interface PlaylistTrack {
  id: number;
  playlistId: number;
  trackId: number;
  title: string;
  duration: number;
  preview: string;
  trackPosition: number;
  artistName: string;
  albumTitle: string;
  addedAt: string;
}

const db = new Dexie('AngularDeezerApp') as Dexie & {
  playlists: EntityTable<Playlist, 'id'>;
  playlistTracks: EntityTable<PlaylistTrack, 'id'>;
};

db.version(1).stores({
  playlists: '++id, name, createdAt',
  playlistTracks: '++id, playlistId, trackId, [playlistId+trackId]',
});

// Sample data
db.on('populate', async () => {
  const playlistId = await db.playlists.add({
    name: 'My first playlist',
    createdAt: new Date().toISOString(),
  });
  await db.playlistTracks.bulkAdd([
    {
      playlistId,
      trackId: 3135556,
      title: 'Harder, Better, Faster, Stronger',
      duration: 224,
      preview: 'https://cdnt-preview.dzcdn.net/api/1/1/7/5/5/0/7550.mp3',
      trackPosition: 1,
      artistName: 'Daft Punk',
      albumTitle: 'Discovery',
      addedAt: new Date().toISOString(),
    },
  ]);
});

export { db };

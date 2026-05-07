export interface DeezerResponse<T> {
  data: T[];
}

export interface DeezerPaginatedResponse<T> extends DeezerResponse<T> {
  total: number;
  next?: string;
}

export interface ArtistByNameResponse {
  id: number;
  name: string;
  picture_medium: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  tracklist: string;
  type: 'artist';
}

export interface ArtistByIdResponse extends ArtistByNameResponse {
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_big: string;
  radio: boolean;
}

export interface DeezerArtistAlbumsResponse {
  data: AlbumByArtistResponse[];
  total: number;
  next?: string;
}

export interface DeezerArtistSummary {
  id: number;
  name: string;
  link: string;

  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;

  tracklist: string;

  type: 'artist';
}

export interface AlbumByArtistResponse {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  fans: number;
  release_date: string; // YYYY-MM-DD Format
  record_type: 'album' | 'single' | 'ep' | string;
  tracklist: string;
  explicit_lyrics: boolean;
  type: 'album';
  artist: DeezerArtistAlbumsResponse;
}

export interface AlbumTrackResponse {
  id: number;
  title: string;
  duration: number;
  preview: string;
  track_position: number;
  type: 'track';
}

export interface DeezerAlbumTracksResponse {
  data: AlbumTrackResponse[];
}

export interface AlbumByIdResponse {
  id: number;
  title: string;
  link: string;

  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;

  md5_image: string;
  genre_id: number;
  fans: number;

  release_date: string; // YYYY-MM-DD
  record_type: 'album' | 'single' | 'ep' | string;

  tracklist: string;
  explicit_lyrics: boolean;

  type: 'album';

  artist: DeezerArtistSummary;
  tracks: DeezerAlbumTracksResponse;
}

export interface DeezerAlbumResponse {
  data: AlbumByIdResponse;
  total: number;
  next?: string;
}

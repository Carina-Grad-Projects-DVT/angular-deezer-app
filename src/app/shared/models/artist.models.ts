export interface DeezerResponse<T> {
  data: T[];
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

export interface ArtistbyIDResponse extends ArtistByNameResponse {
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_big: string;
  radio: boolean;
}

export interface DeezerArtistAlbumsResponse {
  data: DeezerAlbum[];
  total: number;
  next?: string;
}

export interface DeezerAlbum {
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

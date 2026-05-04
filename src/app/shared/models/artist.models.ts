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

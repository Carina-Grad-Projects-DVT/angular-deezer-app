// Response wrapper so we're not stuck with the "{ "data": [ ..." format
export interface DeezerResponse<T> {
  data: T[];
}

export interface ArtistSearchResult {
  id: number;
  name: string;
  picture_medium: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  tracklist: string;
  type: 'artist';
}

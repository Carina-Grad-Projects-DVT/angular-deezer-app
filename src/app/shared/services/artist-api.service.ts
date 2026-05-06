import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { BASE_URL } from '../../../environments/environment';
import {
  AlbumByArtistResponse,
  AlbumById,
  ArtistbyIDResponse,
  ArtistByNameResponse,
  DeezerArtistAlbumsResponse,
  DeezerResponse,
} from '../models/artist.models';

@Injectable({ providedIn: 'root' })
export class ArtistApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = BASE_URL;

  searchArtists(query: string): Observable<ArtistByNameResponse[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return of([]);
    }

    const params = new HttpParams().set('q', trimmedQuery);

    return this.http
      .get<DeezerResponse<ArtistByNameResponse>>(`${this.apiBaseUrl}/search/artist`, { params })
      .pipe(map((response) => response.data));
  }

  getArtistById(id: number): Observable<ArtistbyIDResponse> {
    return this.http.get<ArtistbyIDResponse>(`${this.apiBaseUrl}/artist/${id}`);
  }

  getAlbumsByArtistId(id: number): Observable<AlbumByArtistResponse[]> {
    return this.http
      .get<DeezerArtistAlbumsResponse>(`${this.apiBaseUrl}/artist/${id}/albums`)
      .pipe(map((response) => response.data));
  }

  getAlbumById(id: number): Observable<AlbumById> {
    return this.http.get<AlbumById>(`${this.apiBaseUrl}/album/${id}`);
  }
}

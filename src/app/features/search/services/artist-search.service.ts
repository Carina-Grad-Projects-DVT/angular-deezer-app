import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { BASE_URL } from '../../../../environments/environment';
import { ArtistSearchResult, DeezerResponse } from '../models/search.models';

@Injectable({ providedIn: 'root' })
export class ArtistSearchService {
  private readonly http = inject(HttpClient);
  private readonly searchUrl = `${BASE_URL}/search/artist`;

  searchArtists(query: string): Observable<ArtistSearchResult[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return of([]);
    }

    const params = new HttpParams().set('q', trimmedQuery);

    return this.http
      .get<DeezerResponse<ArtistSearchResult>>(this.searchUrl, { params })
      .pipe(map((res) => res.data));
  }
}

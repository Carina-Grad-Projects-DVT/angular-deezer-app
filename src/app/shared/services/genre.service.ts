import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { BASE_URL } from '../../../environments/environment';
import { DeezerGenre } from '../models/genre.models';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = BASE_URL;
  private readonly genreCache = new Map<number, DeezerGenre>();

  getGenreById(id: number): Observable<DeezerGenre> {
    if (!id) {
      return of({
        id: 0,
        name: 'Unknown',
        picture: '',
        type: 'genre',
      });
    }

    const cachedGenre = this.genreCache.get(id);
    if (cachedGenre) {
      return of(cachedGenre);
    }

    return this.http
      .get<DeezerGenre>(`${this.baseUrl}/genre/${id}`)
      .pipe(tap((genre) => this.genreCache.set(id, genre)));
  }
}

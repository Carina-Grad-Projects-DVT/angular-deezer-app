import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../environments/environment';
import { DeezerGenre } from '../models/genre.models';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private http = inject(HttpClient);
  private baseUrl = BASE_URL;

  private genreCache = signal<Map<number, DeezerGenre>>(new Map());

  getGenreSignal(id: number) {
    const cache = this.genreCache();

    if (cache.has(id)) {
      return signal(cache.get(id)!);
    }

    const genreSignal = signal<DeezerGenre | null>(null);

    if (!id) {
      genreSignal.set({
        id: 0,
        name: 'Unknown',
        picture: '',
        type: 'genre',
      });
      return genreSignal;
    }

    this.http.get<DeezerGenre>(`${this.baseUrl}/genre/${id}`).subscribe((genre) => {
      this.genreCache.update((map) => {
        const newMap = new Map(map);
        newMap.set(id, genre);
        return newMap;
      });

      genreSignal.set(genre);
    });

    return genreSignal;
  }
}

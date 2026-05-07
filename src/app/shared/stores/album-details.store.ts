import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlbumByIdResponse } from '../models/artist.models';
import { DeezerGenre } from '../models/genre.models';
import { ArtistApiService } from '../services/artist-api.service';
import { GenreService } from '../services/genre.service';

@Injectable({ providedIn: 'root' })
export class AlbumDetailsStore {
  private readonly artistApiService = inject(ArtistApiService);
  private readonly genreService = inject(GenreService);
  private readonly destroyRef = inject(DestroyRef);
  private albumByIdSubscription?: Subscription;
  private genreSubscription?: Subscription;

  readonly album = signal<AlbumByIdResponse | null>(null);
  readonly genre = signal<DeezerGenre | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.albumByIdSubscription?.unsubscribe();
      this.genreSubscription?.unsubscribe();
    });
  }

  loadAlbumById(id: number): void {
    this.albumByIdSubscription?.unsubscribe();
    this.genreSubscription?.unsubscribe();
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.genre.set(null);

    this.albumByIdSubscription = this.artistApiService.getAlbumById(id).subscribe({
      next: (album) => {
        this.album.set(album);
        this.loadGenreById(album.genre_id);
      },
      error: () => {
        this.errorMessage.set('Error loading album. Please try again.');
        this.album.set(null);
        this.genre.set(null);
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  private loadGenreById(genreId: number): void {
    this.genreSubscription?.unsubscribe();
    this.genreSubscription = this.genreService.getGenreById(genreId).subscribe({
      next: (genre) => this.genre.set(genre),
      error: () => this.genre.set(null),
    });
  }
}

import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistApiService } from '../services/artist-api.service';
import { AlbumByArtistResponse, ArtistByIdResponse } from '../models/artist.models';

@Injectable({ providedIn: 'root' })
export class ArtistDetailsStore {
  private readonly artistApiService = inject(ArtistApiService);
  private readonly destroyRef = inject(DestroyRef);
  private artistByIdSubscription?: Subscription;
  private albumsByArtistSubscription?: Subscription;
  private readonly isArtistLoading = signal(false);
  private readonly isAlbumsLoading = signal(false);

  readonly artist = signal<ArtistByIdResponse | null>(null);
  readonly albums = signal<AlbumByArtistResponse[]>([]);
  readonly hasLoadedAlbums = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = computed(() => this.isArtistLoading() || this.isAlbumsLoading());

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.artistByIdSubscription?.unsubscribe();
      this.albumsByArtistSubscription?.unsubscribe();
    });
  }

  loadArtistPageData(id: number): void {
    this.errorMessage.set(null);
    this.loadArtistById(id);
    this.loadAlbumsByArtistId(id);
  }

  private loadArtistById(id: number): void {
    this.artistByIdSubscription?.unsubscribe();
    this.isArtistLoading.set(true);

    this.artistByIdSubscription = this.artistApiService.getArtistById(id).subscribe({
      next: (artist) => this.artist.set(artist),
      error: () => {
        this.errorMessage.set('Error loading artist profile. Please try again.');
        this.artist.set(null);
        this.isArtistLoading.set(false);
      },
      complete: () => this.isArtistLoading.set(false),
    });
  }

  private loadAlbumsByArtistId(id: number): void {
    this.albumsByArtistSubscription?.unsubscribe();
    this.isAlbumsLoading.set(true);
    this.hasLoadedAlbums.set(false);

    this.albumsByArtistSubscription = this.artistApiService.getAlbumsByArtistId(id).subscribe({
      next: (albums) => {
        this.albums.set(albums);
        this.hasLoadedAlbums.set(true);
      },
      error: () => {
        this.errorMessage.set('Error loading artist albums. Please try again.');
        this.albums.set([]);
        this.hasLoadedAlbums.set(true);
        this.isAlbumsLoading.set(false);
      },
      complete: () => this.isAlbumsLoading.set(false),
    });
  }
}

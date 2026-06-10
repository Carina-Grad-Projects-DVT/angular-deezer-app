import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import type { AlbumPageResolvedData } from '../../resolvers/album-page.resolver';
import type { ArtistPageResolvedData } from '../../resolvers/artist-page.resolver';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './app-breadcrumb.html',
  styleUrl: './app-breadcrumb.css',
})
export class AppBreadcrumb {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly breadcrumbItems = signal<MenuItem[]>([]);

  readonly items = this.breadcrumbItems.asReadonly();
  readonly isVisible = computed(() => this.items().length > 0);

  constructor() {
    this.setBreadcrumbItems();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.setBreadcrumbItems());
  }

  private setBreadcrumbItems(): void {
    const url = this.router.url.split('?')[0];
    const childRoute = this.getDeepestChildRoute(this.route).snapshot;

    if (url === '/search') {
      this.breadcrumbItems.set([{ label: 'Search' }]);
      return;
    }

    if (url.startsWith('/artist/')) {
      const resolvedData = childRoute.data['artistPageData'] as ArtistPageResolvedData | null;
      const artistName = resolvedData?.artist.name ?? 'Artist';

      this.breadcrumbItems.set([
        { label: 'Search', routerLink: ['/search'] },
        { label: artistName },
      ]);
      return;
    }

    if (url.startsWith('/album/')) {
      const resolvedData = childRoute.data['albumPageData'] as AlbumPageResolvedData | null;
      const album = resolvedData?.album;

      this.breadcrumbItems.set([
        { label: 'Search', routerLink: ['/search'] },
        {
          label: album?.artist.name ?? 'Artist',
          routerLink: album ? ['/artist', album.artist.id] : undefined,
        },
        { label: album?.title ?? 'Album' },
      ]);
      return;
    }

    this.breadcrumbItems.set([]);
  }

  private getDeepestChildRoute(route: ActivatedRoute): ActivatedRoute {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }
}

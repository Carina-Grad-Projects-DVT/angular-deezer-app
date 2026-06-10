import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { PlaylistStore } from './shared/stores/playlist.store';
import { AppBreadcrumb } from './shared/components/app-breadcrumb/app-breadcrumb';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Sidebar, AppBreadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly _playlistStore = inject(PlaylistStore);
  protected readonly title = signal('angular-deezer-app');
  protected readonly isSidebarOpen = signal(false);

  protected openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-deezer-app');
  protected readonly isSidebarOpen = signal(false);

  protected openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}

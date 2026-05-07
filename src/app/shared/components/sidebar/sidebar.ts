import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthStore } from '../../../features/auth/store/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule, RouterModule],
  templateUrl: './sidebar.html',
  standalone: true,
})
export class Sidebar {
  auth = inject(AuthStore);
  items: MenuItem[] = [
    {
      label: 'Search',
      routerLink: '/search',
    },
    {
      label: 'Playlists',
      routerLink: '/playlists',
    },
    {
      label: 'Login',
      routerLink: '/login',
    },
  ];
}

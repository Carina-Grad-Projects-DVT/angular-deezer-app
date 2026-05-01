import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule, ButtonModule],
  templateUrl: './sidebar.html',
  standalone: true,
})
export class Sidebar {
  items = [
    {
      label: 'Home',
    },
    {
      label: 'Artists',
    },
    {
      label: 'Playlists',
    },
  ];
}

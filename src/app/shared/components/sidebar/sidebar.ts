import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule],
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

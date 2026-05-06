import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlbumTrackResponse } from '../../../shared/models/artist.models';
import { formatDuration } from '../../../shared/utils/format-duration';

@Component({
  selector: 'app-track-list',
  standalone: true,
  templateUrl: './track-list.html',
  imports: [TableModule],
  providers: [],
})
export class TrackList {
  readonly tracks = input<AlbumTrackResponse[]>([]);
  readonly formatDuration = formatDuration;
}

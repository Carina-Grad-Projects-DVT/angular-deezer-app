import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBigNumber',
})
export class FormatBigNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) {
      return '';
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1).replace('.0', '')} mill`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1).replace('.0', '')}k`;
    }
    return value.toString();
  }
}

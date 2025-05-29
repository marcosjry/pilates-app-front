import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    const parts = value.split(':');

    if (parts.length >= 2) {

      return `${parts[0]}:${parts[1]}`;
    }

    return value;
  }

}

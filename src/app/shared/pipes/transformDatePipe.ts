import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'transformDatePipe'})
export class TransformDatePipe implements PipeTransform {

  transform(dateString: string): string {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3);
    return date.toISOString();
  }
}

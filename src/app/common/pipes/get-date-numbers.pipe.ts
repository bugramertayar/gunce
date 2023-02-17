import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getDateNumbers', pure: true })
export class GetDateNumbersPipe implements PipeTransform {
  constructor() {}

  transform(value: Date) {
    return [value.getDate(), value.getMonth() + 1, value.getFullYear()];
  }
}

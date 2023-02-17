import { Pipe, PipeTransform } from '@angular/core';
import { CalendarListModel } from 'src/app/components/calendar/model/calendar-list.model';

@Pipe({ name: 'matchDateObject', pure: true })
export class MatchDatePipe implements PipeTransform {
  constructor() {}

  transform(listDataMap: CalendarListModel[], value: number[]) {
    return listDataMap.find(
      (x) => x.day === value[0] && x.month === value[1] && x.year === value[2]
    )?.eventList;
  }
}

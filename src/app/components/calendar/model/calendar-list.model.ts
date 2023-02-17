import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalendarListModel {
  day: number = 0;
  month: number = 0;
  year: number = 0;
  eventList: string[] = [];
}

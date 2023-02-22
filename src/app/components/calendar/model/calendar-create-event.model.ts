import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalendarCreateEventModel {
  day: number = 0;
  month: number = 0;
  year: number = 0;
  content: string = '';
  eventType: string = '';
}

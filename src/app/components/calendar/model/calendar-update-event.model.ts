import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalendarUpdateEventModel {
  id: number = 0;
  content: string = '';
  eventId: number = 0;
}

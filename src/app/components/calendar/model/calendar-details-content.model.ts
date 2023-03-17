import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CalendarDetailsContentModel {
  id: number = 0;
  content: string = '';
  eventTypeList: EventTypeListModel = new EventTypeListModel();
}

export class EventTypeListModel {
  eventId: number = 0;
  eventTypeName: string = '';
}

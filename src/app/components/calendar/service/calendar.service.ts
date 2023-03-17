import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DropdownOptionModel } from 'src/app/common/dropdown/model/dropdown-option.model';
import { BaseService } from 'src/app/common/services/base.service';
import { environment } from 'src/environments/environment';
import { CalendarCreateEventModel } from '../model/calendar-create-event.model';
import { CalendarDetailsContentModel } from '../model/calendar-details-content.model';
import { CalendarListModel } from '../model/calendar-list.model';
import { CalendarUpdateEventModel } from '../model/calendar-update-event.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getCalendarList(
    month: number,
    year: number
  ): Observable<CalendarListModel[]> {
    return this.get(
      `${environment.apiUrl}content/get-contents-by-months/${month}/${year}`,
      'hidden'
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getEventTypeDropdownOptions(): Observable<DropdownOptionModel[]> {
    return this.get(`${environment.apiUrl}event/get-event-list`, 'hidden').pipe(
      map((data: DropdownOptionModel[]) => {
        return data;
      })
    );
  }

  public createCalendarEvent(
    createModel: CalendarCreateEventModel
  ): Observable<boolean> {
    return this.post(
      `${environment.apiUrl}content/create-content`,
      createModel
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public updateCalendarEvent(
    updateModel: CalendarUpdateEventModel
  ): Observable<boolean> {
    return this.put(
      `${environment.apiUrl}content/update-content/${updateModel.id}`,
      updateModel
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getDayEvents(
    day: number,
    month: number,
    year: number
  ): Observable<CalendarDetailsContentModel[]> {
    return this.get(
      `${environment.apiUrl}content/get-contents-by-day/${day}/${month}/${year}`,
      'hidden'
    ).pipe(
      map((data: CalendarDetailsContentModel[]) => {
        return data;
      })
    );
  }

  public deleteDayEvent(id: number): Observable<boolean> {
    return this.delete(
      `${environment.apiUrl}content/delete-content/${id}`,
      'hidden'
    ).pipe(
      map((data) => {
        return data;
      })
    );
  }
}

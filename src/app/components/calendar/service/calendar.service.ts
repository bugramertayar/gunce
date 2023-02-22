import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { environment } from 'src/environments/environment';
import { CalendarCreateEventModel } from '../model/calendar-create-event.model';
import { CalendarListModel } from '../model/calendar-list.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getCalendarList(): Observable<CalendarListModel[]> {
    return this.get(
      `${environment.apiUrl}account/get-contents-by-months/2/2023`,
      'hidden'
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public createCalendarEvent(
    createModel: CalendarCreateEventModel
  ): Observable<boolean> {
    return this.post(
      `${environment.apiUrl}account/create-content`,
      createModel
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}

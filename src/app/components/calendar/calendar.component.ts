import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarListModel } from './model/calendar-list.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  listDataMap: CalendarListModel[] = [];

  constructor(public http: HttpClient, public router: Router) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://10.22.8.57:8080/api/account/deneme', {
        headers: new HttpHeaders(),
        observe: 'body',
        reportProgress: true,
        responseType: 'json',
      })
      .subscribe((data) => {
        this.listDataMap = data;
      });
  }

  selectedChanged(value: any) {
    this.router.navigateByUrl('calendar/create');
  }

  dateChanged(value: any) {
    console.log(value);
  }
}

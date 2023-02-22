import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarListModel } from './model/calendar-list.model';
import { CalendarService } from './service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  listDataMap: CalendarListModel[] = [];

  constructor(public calendarService: CalendarService, public router: Router) {}

  ngOnInit(): void {
    this.calendarService.getCalendarList().subscribe((result) => {
      this.listDataMap = result;
    });
  }

  selectedChanged(value: Date) {
    this.router.navigateByUrl(
      `calendar/create/${value.getDate()}/${
        value.getMonth() + 1
      }/${value.getFullYear()}`
    );
  }

  dateChanged(value: any) {
    console.log(value);
  }
}

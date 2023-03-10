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
  currentDate: Date = new Date();
  constructor(public calendarService: CalendarService, public router: Router) {}

  ngOnInit(): void {
    this.getCalendar(
      this.currentDate.getMonth() + 1,
      this.currentDate.getFullYear()
    );
  }

  selectedChanged(value: any) {}

  clickedDate(selectedDate: Date) {
    if (selectedDate) {
      this.router.navigateByUrl(
        `calendar/details/${selectedDate.getDate()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getFullYear()}`
      );
    }
  }

  panelChanged(value: any) {}

  dateModelChanged(value: Date) {
    if (value) {
      this.getCalendar(value.getMonth() + 1, value.getFullYear());
    }
  }

  getCalendar(month: number, year: number) {
    this.calendarService.getCalendarList(month, year).subscribe((result) => {
      this.listDataMap = result;
    });
  }
}

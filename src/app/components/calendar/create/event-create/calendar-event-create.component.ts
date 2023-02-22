import { Component, OnInit } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarCreateEventModel } from '../../model/calendar-create-event.model';
import { CalendarService } from '../../service/calendar.service';
@Component({
  selector: 'app-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
})
export class CalendarEventCreateComponent implements OnInit {
  articleInput: string = '';
  currentDay: number = 0;
  currentMonth: number = 0;
  currentYear: number = 0;
  constructor(
    private route: ActivatedRoute,
    public calendarService: CalendarService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentDay = Number(this.route.snapshot.paramMap.get('day'));
    this.currentMonth = Number(this.route.snapshot.paramMap.get('month'));
    this.currentYear = Number(this.route.snapshot.paramMap.get('year'));
  }

  articleContentChanged(value: string) {
    this.articleInput = value;
  }

  onSubmit() {
    const eventCreateModel = new CalendarCreateEventModel();
    eventCreateModel.day = this.currentDay;
    eventCreateModel.month = this.currentMonth;
    eventCreateModel.year = this.currentYear;
    eventCreateModel.content = this.articleInput;
    eventCreateModel.eventType = 'success';
    this.calendarService
      .createCalendarEvent(eventCreateModel)
      .subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('calendar');
        }
      });
  }
}

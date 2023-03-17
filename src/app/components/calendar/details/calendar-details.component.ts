import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CalendarDetailsContentModel } from '../model/calendar-details-content.model';
import { CalendarService } from '../service/calendar.service';
@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.scss'],
})
export class CalendarDetailsComponent implements OnInit {
  currentDay: number = 0;
  currentMonth: number = 0;
  currentYear: number = 0;

  allEvents: CalendarDetailsContentModel[] = [];
  initialDetailsPage: boolean = false;
  selectedEvent: CalendarDetailsContentModel =
    new CalendarDetailsContentModel();
  showLoader: boolean = true;

  constructor(
    public calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NzNotificationService
  ) {
    this.currentDay = Number(this.activatedRoute.snapshot.paramMap.get('day'));
    this.currentMonth = Number(
      this.activatedRoute.snapshot.paramMap.get('month')
    );
    this.currentYear = Number(
      this.activatedRoute.snapshot.paramMap.get('year')
    );
  }

  ngOnInit(): void {
    this.getDayEvents(() => {
      this.showLoader = false;
    });
  }

  openEventDetail(event: CalendarDetailsContentModel) {
    if (event) {
      this.selectedEvent = event;
    }
  }

  deleteEvent(eventId: number) {
    if (eventId) {
      this.showLoader = true;
      this.calendarService
        .deleteDayEvent(eventId)
        .subscribe((result: boolean) => {
          if (result) {
            this.notificationService.success(
              'Delete Event',
              'Event successfully deleted.'
            );
            this.selectedEvent = new CalendarDetailsContentModel();
            this.getDayEvents(() => {
              this.showLoader = false;
            });
          }
        });
    }
  }

  goBackToEvents() {
    this.showLoader = true;
    this.selectedEvent = new CalendarDetailsContentModel();
    this.getDayEvents(() => {
      this.showLoader = false;
    });
  }

  getDayEvents(completed?: () => void) {
    this.calendarService
      .getDayEvents(this.currentDay, this.currentMonth, this.currentYear)
      .subscribe((result: CalendarDetailsContentModel[]) => {
        this.allEvents = result;
        if (this.allEvents.length === 0) {
          this.initialDetailsPage = true;
        }
        if (completed) {
          completed();
        }
      });
  }

  addNewEvent() {
    this.allEvents = [];
  }
}

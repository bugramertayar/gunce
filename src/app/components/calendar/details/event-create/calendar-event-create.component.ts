import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
import { CalendarCreateEventModel } from '../../model/calendar-create-event.model';
import { CalendarService } from '../../service/calendar.service';
import { CalendarDetailsContentModel } from '../../model/calendar-details-content.model';
import { DropdownOptionModel } from 'src/app/common/dropdown/model/dropdown-option.model';
import { CalendarUpdateEventModel } from '../../model/calendar-update-event.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
})
export class CalendarEventCreateComponent implements OnInit {
  @Input() currentDay: number = 0;
  @Input() currentMonth: number = 0;
  @Input() currentYear: number = 0;
  @Output() eventSubmitted: EventEmitter<boolean>;

  articleInput: string = '';
  selectedEventId: number = 1;
  optionList: DropdownOptionModel[] = [];
  showLoader: boolean = false;

  eventToUpdate: CalendarDetailsContentModel =
    new CalendarDetailsContentModel();

  _selectedEvent: CalendarDetailsContentModel =
    new CalendarDetailsContentModel();

  @Input()
  set selectedEvent(selectedEvent: CalendarDetailsContentModel) {
    if (selectedEvent.content) {
      this.articleInput = selectedEvent.content;
      this.selectedEventId = selectedEvent.eventTypeList.eventId;
      this.eventToUpdate = selectedEvent;
    }
  }
  get selectedEvent() {
    return this._selectedEvent;
  }

  constructor(
    public calendarService: CalendarService,
    private notificationService: NzNotificationService
  ) {
    this.eventSubmitted = new EventEmitter();
  }

  ngOnInit(): void {
    this.calendarService
      .getEventTypeDropdownOptions()
      .subscribe((result: DropdownOptionModel[]) => {
        if (result) {
          this.optionList = result;
        }
      });
  }

  articleContentChanged(value: string) {
    this.articleInput = value;
  }

  dropdownValueChanged(value: number) {
    this.selectedEventId = value;
  }

  onSubmit() {
    if (this.eventToUpdate.id) {
      const eventUpdateModel = new CalendarUpdateEventModel();
      eventUpdateModel.id = this.eventToUpdate.id;
      eventUpdateModel.content = this.articleInput;
      eventUpdateModel.eventId = this.selectedEventId;
      this.showLoader = true;
      this.calendarService
        .updateCalendarEvent(eventUpdateModel)
        .subscribe((result) => {
          if (result) {
            this.notificationService.success(
              'Update Event',
              'Your event have successfully updated.'
            );
            this.showLoader = false;
            this.eventSubmitted.emit(true);
          }
        });
    } else {
      const eventCreateModel = new CalendarCreateEventModel();
      eventCreateModel.day = this.currentDay;
      eventCreateModel.month = this.currentMonth;
      eventCreateModel.year = this.currentYear;
      eventCreateModel.content = this.articleInput;
      eventCreateModel.eventId = this.selectedEventId;
      this.showLoader = true;
      this.calendarService
        .createCalendarEvent(eventCreateModel)
        .subscribe((result) => {
          if (result) {
            this.notificationService.success(
              'Create Event',
              'Your event have successfully created.'
            );
            this.showLoader = false;
            this.eventSubmitted.emit(true);
          }
        });
    }
  }
}

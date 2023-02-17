import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
})
export class CalendarEventCreateComponent implements OnInit {
  calendarCreateForm: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.calendarCreateForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.calendarCreateForm.valid) {
      console.log(this.calendarCreateForm.controls['content'].value);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
@Component({
  selector: 'app-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
})
export class CalendarEventCreateComponent implements OnInit {
  articleInput: string = '';
  constructor() {}

  ngOnInit(): void {}

  articleContentChanged(value: string) {
    this.articleInput = value;
  }

  onSubmit() {
    console.log(this.articleInput);
  }
}

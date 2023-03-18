import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { QuillModule } from 'ngx-quill';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GetDateNumbersPipe } from './pipes/get-date-numbers.pipe';
import { MatchDatePipe } from './pipes/match-date-object.pipe';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    NzSpinModule,
    NzCalendarModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    DropdownComponent,
    SpinnerComponent,
    GetDateNumbersPipe,
    MatchDatePipe,
    ArticleEditorComponent,
  ],
  exports: [
    DropdownComponent,
    SpinnerComponent,
    GetDateNumbersPipe,
    MatchDatePipe,
    ArticleEditorComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    NzSpinModule,
    NzCalendarModule,
  ],
  providers: [],
})
export class CoreModule {
  constructor() {}
}

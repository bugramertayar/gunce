import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { QuillModule } from 'ngx-quill';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ButtonComponent } from './button/button.component';
import { GetDateNumbersPipe } from './pipes/get-date-numbers.pipe';
import { MatchDatePipe } from './pipes/match-date-object.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzBadgeModule,
    NzInputModule,
    NzButtonModule,
    NzCalendarModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    ButtonComponent,
    GetDateNumbersPipe,
    MatchDatePipe,
    ArticleEditorComponent,
  ],
  exports: [
    ButtonComponent,
    GetDateNumbersPipe,
    MatchDatePipe,
    ArticleEditorComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzBadgeModule,
    NzInputModule,
    NzButtonModule,
    NzCalendarModule,
  ],
  providers: [],
})
export class CoreModule {
  constructor() {}
}

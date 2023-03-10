import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/common/core.module';
import { CanActivateViaAuthGuard } from 'src/app/common/guard/can-activate-via-auth.guard';
import { CalendarComponent } from './calendar.component';
import { CalendarDetailsComponent } from './details/calendar-details.component';
import { CalendarEventCreateComponent } from './details/event-create/calendar-event-create.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [CanActivateViaAuthGuard],
        component: CalendarComponent,
      },
      {
        path: 'details/:day/:month/:year',
        canActivate: [CanActivateViaAuthGuard],
        component: CalendarDetailsComponent,
      },
    ]),
  ],
  declarations: [
    CalendarDetailsComponent,
    CalendarEventCreateComponent,
    CalendarComponent,
  ],
  exports: [],
  providers: [],
})
export class CalendarModule {}

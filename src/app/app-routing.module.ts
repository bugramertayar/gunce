import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './common/guard/can-activate-via-auth.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarEventCreateComponent } from './components/calendar/create/event-create/calendar-event-create.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'calendar',
    canActivate: [CanActivateViaAuthGuard],
    component: CalendarComponent,
  },
  {
    path: 'calendar/details/:day/:month/:year',
    canActivate: [CanActivateViaAuthGuard],
    component: CalendarEventCreateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

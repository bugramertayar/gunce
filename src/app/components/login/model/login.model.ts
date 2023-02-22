import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LoginModel {
  username: string = '';
  password: string = '';
}

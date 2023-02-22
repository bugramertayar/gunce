import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RegisterModel {
  nameSurname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && token !== '') {
      return true;
    } else {
      return false;
    }
  }
}

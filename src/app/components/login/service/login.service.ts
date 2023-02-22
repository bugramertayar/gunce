import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public login(loginModel: LoginModel): Observable<any> {
    return this.post(`${environment.apiUrl}account/login`, loginModel).pipe(
      map((data: any) => {
        localStorage.setItem('token', data.token);
        return data;
      })
    );
  }
}

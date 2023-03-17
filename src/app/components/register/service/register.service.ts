import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../model/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public login(registerModel: RegisterModel): Observable<any> {
    return this.post(
      `${environment.apiUrl}account/register`,
      registerModel
    ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}

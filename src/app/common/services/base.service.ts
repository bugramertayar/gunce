import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BaseService {
  private readonly _options: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
  };

  protected constructor(public http: HttpClient) {
    this._options = {
      headers: new HttpHeaders(),
      observe: 'body',
      reportProgress: true,
      responseType: 'json',
    };
  }

  get options(): {
    headers?: HttpHeaders;
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
    body?: any;
  } {
    return this._options;
  }

  deleteCache(url: string): void {
    const header: string = this._options.headers?.get('cache-delete') as any;
    let cacheDelete: string[] =
      header && header !== '' ? header.split(';') : (null as any);
    cacheDelete = cacheDelete ? cacheDelete : [];
    if (!cacheDelete.find((c) => c === url)) {
      cacheDelete.push(url);
    }
    this.setHeader('cache-delete', cacheDelete.join(';'), false);
  }

  ignoreError(): void {
    this.setHeader('ignoreError', 'true');
  }

  setHeader(
    key: string = 'cache',
    value: string = '0',
    append: boolean = true
  ): void {
    this._options.headers = append
      ? this._options.headers?.append(key, value)
      : this._options.headers?.set(key, value);
  }

  public get(
    url: string,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    this.setLoader(loaderType);
    this.setCache(setCache);
    return this.http.get(url, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getDownload(
    url: string,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    this.setLoader(loaderType);
    this.setCache(setCache);
    this.options.responseType = 'blob' as 'json';
    return this.http.get(url, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public post(
    url: string,
    body: any,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    body = body ? body : {};
    this.setLoader(loaderType);
    this.setCache(setCache);
    return this.http.post(url, body, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public put(
    url: string,
    body: any,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    body = body ? body : {};
    this.setLoader(loaderType);
    this.setCache(setCache);
    return this.http.put(url, body, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public patch(
    url: string,
    body: any,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    body = body ? body : {};
    this.setLoader(loaderType);
    this.setCache(setCache);
    return this.http.patch(url, body, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public delete(
    url: string,
    body?: any,
    loaderType: LoaderType = 'visible',
    setCache: number = 0
  ): Observable<any> {
    body = body ? body : null;
    this.setLoader(loaderType);
    this.setCache(setCache);
    this.options.body = body;
    return this.http.delete(url, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private setLoader(loaderType: LoaderType): void {
    this.setHeader('loaderType', loaderType, false);
  }

  private setCache(value: number): void {
    if (value <= 0) {
      return;
    }
    this.setHeader('cache', value.toString());
  }
}

export type LoaderType = 'visible' | 'hidden' | 'disable';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, flatMap, retryWhen, take, tap } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization.service';
import { LoaderType } from '../services/base.service';
import { KeyedCollection } from './keyedcollection';
import { RequestCacheService } from './request-cache.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private _requests: KeyedCollection<HttpRequest<any>> = new KeyedCollection<
    HttpRequest<any>
  >();
  private _loaderUrls: KeyedCollection<LoaderType> =
    new KeyedCollection<LoaderType>();

  constructor(
    private _requestCacheService: RequestCacheService,
    private authorizationService: AuthorizationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === 'importSaveUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    if (request.url === 'importRemoveUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    if (request.urlWithParams.indexOf('user/login') > -1) {
      this._requestCacheService.cache.clear();
    }

    if (
      request.headers.get('loaderType') &&
      request.headers.get('loaderType') !== ''
    ) {
      const loaderType: LoaderType =
        request.headers.get('loaderType') === 'visible'
          ? 'visible'
          : request.headers.get('loaderType') === 'hidden'
          ? 'hidden'
          : 'disable';
      this._loaderUrls.add(request.url, loaderType);
      const findVisibles: LoaderType[] = this._loaderUrls
        .values()
        .filter((lu) => lu === 'visible');
      const findDisableds: LoaderType[] = this._loaderUrls
        .values()
        .filter((lu) => lu === 'disable');
      if (
        loaderType === 'visible' ||
        (findVisibles &&
          findVisibles.length > 0 &&
          (!findDisableds || findDisableds.length <= 0))
      ) {
      }
      request = request.clone({
        headers: request.headers.delete('loaderType'),
      });
    }

    const token: string = this.authorizationService.getToken();
    if (token && !request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    if (!request.headers.has('Language')) {
      request = request.clone({
        headers: request.headers.set('Language', 'en'),
      });
    }

    if (
      request.headers.get('cache-delete') &&
      request.headers.get('cache-delete') !== ''
    ) {
      const header: string = request.headers.get('cache-delete') as string;
      let cacheDelete: string[] =
        header && header !== '' ? header.split(';') : (null as any);
      cacheDelete = cacheDelete ? cacheDelete : [];
      for (const cache of cacheDelete) {
        this._requestCacheService.delete(cache);
      }
      request = request.clone({
        headers: request.headers.delete('cache-delete'),
      });
    }

    this._requests.add(request.url, request);

    let cacheMaxAgeMinutes = 0;
    if (request.headers.get('cache') && request.headers.get('cache') !== '') {
      // cacheMaxAgeMinutes = +request.headers.get('cache');
      cacheMaxAgeMinutes = cacheMaxAgeMinutes > 0 ? cacheMaxAgeMinutes : 0;
      request = request.clone({ headers: request.headers.delete('cache') });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set(
          'Content-Type',
          'application/json; charset=utf-8'
        ),
      });
    } else if (
      request.headers.get('Content-Type') &&
      request.headers.get('Content-Type') === 'remove'
    ) {
      request = request.clone({
        headers: request.headers.delete('Content-Type'),
      });
    }

    if (cacheMaxAgeMinutes > 0) {
      const cachedResponse = this._requestCacheService.get(
        request.urlWithParams,
        cacheMaxAgeMinutes
      );
      if (cachedResponse) {
        this.removeRequest(request, true);
        return of(cachedResponse);
      }
    }

    if (cacheMaxAgeMinutes > 0) {
      return new Observable((observer) => {
        const subscription = next
          .handle(request)
          .pipe(
            tap((response) => {
              if (response instanceof HttpResponse) {
                if (response && response.status && response.status === 200) {
                  this._requestCacheService.put<HttpResponse<any>>(
                    request,
                    response,
                    cacheMaxAgeMinutes
                  );
                }
              }
            }),
            retryWhen((error) => {
              return error.pipe(
                take(10),
                flatMap((error: any) => {
                  if (
                    error.status === 502 ||
                    error.status === 503 ||
                    error.status === 504
                  ) {
                    return of(error.status).pipe(delay(3000));
                  }
                  return throwError(error);
                })
              );
            })
          )
          .subscribe(
            (response) => {
              if (response instanceof HttpResponse) {
                this.removeRequest(request);
                observer.next(response);
              }
            },
            (err) => {
              this.removeRequest(request);
              observer.error(err);
            },
            () => {
              observer.complete();
            }
          );
        return () => {
          try {
            subscription.unsubscribe();
          } catch (err) {}
        };
      });
    } else {
      return new Observable((observer) => {
        const subscription = next
          .handle(request)
          .pipe(
            retryWhen((error) => {
              return error.pipe(
                take(10),
                flatMap((error: any) => {
                  if (
                    error.status === 502 ||
                    error.status === 503 ||
                    error.status === 504
                  ) {
                    return of(error.status).pipe(delay(3000));
                  }
                  return throwError(error);
                })
              );
            })
          )
          .subscribe(
            (response) => {
              if (response instanceof HttpResponse) {
                this.removeRequest(request);
                observer.next(response);
              }
            },
            (err) => {
              this.removeRequest(request);
              observer.error(err);
            },
            () => {
              observer.complete();
            }
          );
        return () => {
          try {
            subscription.unsubscribe();
          } catch (err) {}
        };
      });
    }
  }

  private removeRequest(request: HttpRequest<any>, clear: boolean = false) {
    this._requests.remove(request.url);
    if (clear) {
      this._requests = new KeyedCollection<HttpRequest<any>>();
      this._loaderUrls = new KeyedCollection<LoaderType>();
      return;
    }
    const findDisableds: LoaderType[] = this._loaderUrls
      .values()
      .filter((lu: any) => lu === 'disable');
    if (
      this._requests.count() <= 0 &&
      (!findDisableds || findDisableds.length <= 0)
    ) {
      this._loaderUrls = new KeyedCollection<LoaderType>();
    } else if (this._requests.count() <= 0) {
      this._requests = new KeyedCollection<HttpRequest<any>>();
      this._loaderUrls = new KeyedCollection<LoaderType>();
    }
    if (this._requests.count() <= 0 || this._loaderUrls.count() <= 0) {
    }
  }
}

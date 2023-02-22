import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService {
  cache = new Map();

  get(url: string, maxAgeMinutes: number): HttpResponse<any> | null {
    const cached = this.cache.get(url);

    if (!cached) {
      return null;
    }

    const isExpired = cached.lastRead < Date.now() - maxAgeMinutes * 60 * 1000;
    return !isExpired ? cached.response : null;
  }

  delete(url: string): void {
    if (this.cache.get(url)) {
      this.cache.delete(url);
    } else {
      const data = classToPlain(environment);
      Object.keys(environment).forEach((name) => {
        // if (this.cache.get(`${data[name]}${url}`)) {
        //   this.cache.delete(`${data[name]}${url}`);
        // }
      });
    }
  }

  put<T>(request: HttpRequest<any>, response: T, maxAgeMinutes: number): void {
    const url = request.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    const expired = Date.now() - maxAgeMinutes * 60 * 1000;
    this.cache.forEach((expiredEntry) => {
      if (expiredEntry.lastRead < expired) {
        this.delete(expiredEntry.url);
      }
    });
  }
}

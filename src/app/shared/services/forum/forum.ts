import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class Forum {
  private readonly API_PREFIX = 'forum';

  private http = inject(HttpClient);

  getForums(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_PREFIX);
  }

  getHome(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_PREFIX);
  }

  updateForums(params: Category[]): Observable<void> {
    return this.http.put<void>(this.API_PREFIX, params, {
      withCredentials: true,
    });
  }
}

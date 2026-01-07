import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Config as ConfigModel } from '../../models/Config';
import { BottomLink } from '../../models/BottomLink';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private readonly API_PREFIX = 'config';

  private http = inject(HttpClient);

  getExists(): Observable<{ config: boolean; admin: boolean }> {
    return this.http.get<{ config: boolean; admin: boolean }>(
      `${this.API_PREFIX}/exists`,
    );
  }

  init(data: { title: string; lang: string }): Observable<null> {
    return this.http.post<null>(`${this.API_PREFIX}/init`, data);
  }

  get(): Observable<{ config: ConfigModel; bottomLinks: BottomLink[] }> {
    return this.http.get<{ config: ConfigModel; bottomLinks: BottomLink[] }>(
      this.API_PREFIX,
    );
  }

  update(config: ConfigModel): Observable<null> {
    return this.http.put<null>(this.API_PREFIX, config, {
      withCredentials: true,
    });
  }
}

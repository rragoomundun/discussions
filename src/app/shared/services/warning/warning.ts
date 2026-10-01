import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserWarning } from '../../models/UserWarning';

@Injectable({
  providedIn: 'root',
})
export class Warning {
  private readonly API_PREFIX = 'warning';

  private http = inject(HttpClient);

  sendWarning(message: string, userId: number): Observable<void> {
    return this.http.post<void>(
      this.API_PREFIX,
      { message, userId },
      { withCredentials: true },
    );
  }

  getUserWarnings(userId: number): Observable<UserWarning[]> {
    return this.http.get<UserWarning[]>(`${this.API_PREFIX}/all`, {
      params: { userId },
    });
  }
}

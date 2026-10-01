import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
}

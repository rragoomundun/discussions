import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_PREFIX = 'auth';

  private http = inject(HttpClient);

  register(params: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }): Observable<null> {
    return this.http.post<null>(`${this.API_PREFIX}/register`, params);
  }

  registerConfirm(token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.API_PREFIX}/register/confirm/${token}`,
      {},
      { withCredentials: true },
    );
  }

  login(params: {
    name: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.API_PREFIX}/login`,
      params,
      { withCredentials: true },
    );
  }
}

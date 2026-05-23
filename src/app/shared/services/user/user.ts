import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User as UserModel } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly API_PREFIX = 'user';

  private http = inject(HttpClient);

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(this.API_PREFIX, { withCredentials: true });
  }

  updateEmail(email: string): Observable<void> {
    return this.http.put<void>(
      `${this.API_PREFIX}/email`,
      { email },
      { withCredentials: true },
    );
  }

  updatePassword(password: string, passwordConfirmation: string): Observable<void> {
    return this.http.put<void>(
      `${this.API_PREFIX}/password`,
      { password, passwordConfirmation },
      { withCredentials: true },
    );
  }
}

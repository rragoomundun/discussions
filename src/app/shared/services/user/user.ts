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
}

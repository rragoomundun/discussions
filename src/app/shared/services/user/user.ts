import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User as UserModel } from '../../models/User';
import { UserProfile } from '../../models/UserProfile';
import { UserInformations } from '../../models/UserInformations';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly API_PREFIX = 'user';

  private http = inject(HttpClient);

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(this.API_PREFIX, { withCredentials: true });
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_PREFIX}/${id}`);
  }

  getUserInformations(id: number): Observable<UserInformations> {
    return this.http.get<UserInformations>(
      `${this.API_PREFIX}/${id}/informations`,
    );
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

  updatePersonalInformation(data: {
    birthday: string | null;
    location: string | null;
    gender: 'male' | 'female' | null;
    biography: string | null;
  }): Observable<void> {
    return this.http.put<void>(
      `${this.API_PREFIX}/personal-information`,
      data,
      { withCredentials: true },
    );
  }

  updateProfilePicture(path: string | null): Observable<void> {
    return this.http.put<void>(
      `${this.API_PREFIX}/profile-picture`,
      { path },
      { withCredentials: true },
    );
  }

  updateSignature(signature: string | null): Observable<void> {
    return this.http.put<void>(
      `${this.API_PREFIX}/signature`,
      { signature },
      { withCredentials: true },
    );
  }
}

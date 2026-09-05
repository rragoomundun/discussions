import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User as UserModel } from '../../models/User';
import { UserProfile } from '../../models/UserProfile';
import { UserInformations } from '../../models/UserInformations';
import { UserDiscussionsMeta } from '../../models/UserDiscussionsMeta';
import { Discussion as DiscussionModel } from '../../models/Discussion';
import { UserMessagesMeta } from '../../models/UserMessagesMeta';
import { UserMessage } from '../../models/UserMessage';

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

  getUserDiscussionsMeta(id: number): Observable<UserDiscussionsMeta> {
    return this.http.get<UserDiscussionsMeta>(
      `${this.API_PREFIX}/${id}/discussions/meta`,
    );
  }

  getUserDiscussions(
    id: number,
    page: number | null,
  ): Observable<DiscussionModel[]> {
    return this.http.get<DiscussionModel[]>(
      `${this.API_PREFIX}/${id}/discussions`,
      { params: page !== null ? { page } : {} },
    );
  }

  getUserMessagesMeta(id: number): Observable<UserMessagesMeta> {
    return this.http.get<UserMessagesMeta>(
      `${this.API_PREFIX}/${id}/messages/meta`,
    );
  }

  getUserMessages(
    id: number,
    page: number | null,
  ): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(`${this.API_PREFIX}/${id}/messages`, {
      params: page !== null ? { page } : {},
    });
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

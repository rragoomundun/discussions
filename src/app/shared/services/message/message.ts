import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message as MessageModel } from '../../models/Message';

@Injectable({
  providedIn: 'root',
})
export class Message {
  private readonly API_PREFIX = 'message';

  private http = inject(HttpClient);

  getMessages(discussionId: number, page: number): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.API_PREFIX}/all`, {
      params: { discussionId, page },
    });
  }
}

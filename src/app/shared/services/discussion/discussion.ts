import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Discussion as DiscussionModel, DiscussionDetail } from '../../models/Discussion';

@Injectable({
  providedIn: 'root',
})
export class Discussion {
  private readonly API_PREFIX = 'discussion';

  private http = inject(HttpClient);

  getDiscussions(forumId: number, page: number): Observable<DiscussionModel[]> {
    return this.http.get<DiscussionModel[]>(`${this.API_PREFIX}/all`, {
      params: { forumId, page },
    });
  }

  getDiscussion(discussionId: number): Observable<DiscussionDetail> {
    return this.http.get<DiscussionDetail>(`${this.API_PREFIX}/${discussionId}`);
  }
}

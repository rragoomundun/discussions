import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SearchMeta } from '../../models/SearchMeta';
import { SearchResult } from '../../models/SearchResult';

@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly API_PREFIX = 'search';

  private http = inject(HttpClient);

  getSearchMeta(query: string): Observable<SearchMeta> {
    return this.http.get<SearchMeta>(`${this.API_PREFIX}/meta`, {
      params: { query },
    });
  }

  getSearchResults(query: string, page: number | null): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.API_PREFIX, {
      params: page !== null ? { query, page } : { query },
    });
  }
}

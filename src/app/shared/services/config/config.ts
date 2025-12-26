import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private readonly API_PREFIX = 'config';

  private http = inject(HttpClient);

  getExists(): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.API_PREFIX}/exists`);
  }
}

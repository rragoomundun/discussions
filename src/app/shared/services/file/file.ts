import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class File {
  private readonly API_PREFIX = 'file';

  private http = inject(HttpClient);

  uploadFile(
    file: Blob,
    category: string = 'user',
  ): Observable<{ path: string }> {
    const formData = new FormData();

    formData.append('category', category);
    formData.append('file', file);

    return this.http.post<{ path: string }>(`${this.API_PREFIX}`, formData, {
      withCredentials: true,
    });
  }

  deleteFile(params: { path: string }): Observable<null> {
    return this.http.delete<null>(this.API_PREFIX, {
      body: params,
      withCredentials: true,
    });
  }
}

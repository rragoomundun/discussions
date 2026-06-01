import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category as CategoryModel } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly API_PREFIX = 'category';

  private http = inject(HttpClient);

  getCategoryForums(categoryId: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      `${this.API_PREFIX}/${categoryId}/forum`,
    );
  }
}

import { Injectable } from '@angular/core';

import slug from 'slug';

@Injectable({
  providedIn: 'root',
})
export class Util {
  getSlug(text: string): string {
    return slug(text, { lower: true });
  }
}

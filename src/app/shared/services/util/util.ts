import { Injectable } from '@angular/core';

import slug from 'slug';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class Util {
  getSlug(text: string): string {
    return slug(text, { lower: true });
  }

  markdownToHTML(text: string): string {
    return (<string>marked(text)).replaceAll(
      '<img',
      '<img class="w-100 rounded" ',
    );
  }
}

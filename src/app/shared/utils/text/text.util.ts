import { marked } from 'marked';

export function markdownToHTML(text: string): string {
  return (<string>marked(text)).replaceAll(
    '<img',
    '<img class="w-100 rounded" ',
  );
}

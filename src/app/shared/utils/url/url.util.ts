import slug from 'slug';

export function getSlug(text: string): string {
  return slug(text, { lower: true });
}

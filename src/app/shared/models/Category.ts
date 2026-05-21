import { Forum } from './Forum';

export interface Category {
  id: number | undefined;
  name: string;
  description: string;
  metaDescription: string;
  index: number;
  forums: Forum[];
}

import { Forum } from './Forum';

export interface Category {
  id: number | undefined;
  name: string;
  metaDescription: string;
  index: number;
  forums: Forum[];
}

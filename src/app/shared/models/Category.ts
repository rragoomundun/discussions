import { Forum } from './Forum';

export interface Category {
  id: number | undefined;
  name: string;
  meta_description: string;
  index: number;
  forums: Forum[];
}

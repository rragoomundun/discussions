import { Forum } from './Forum';

export interface Category {
  id: number | undefined;
  name: string;
  index: number;
  forums: Forum[];
}

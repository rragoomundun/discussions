export interface SearchResult {
  discussion: {
    id: number;
    title: string;
  };
  forum: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  message: {
    id: number;
    message: string;
    date: string;
  };
  user: {
    id: number;
    name: string;
    image: string;
    role: 'admin' | 'moderator' | 'regular';
  };
}

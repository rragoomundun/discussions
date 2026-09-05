export interface UserMessage {
  discussion: {
    id: number;
    title: string;
    page: number;
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
}

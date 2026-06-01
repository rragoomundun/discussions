export interface ForumLastMessage {
  discussion: { id: number; name: string };
  date: string;
}

export interface Forum {
  id: number | undefined;
  name: string;
  description: string;
  metaDescription: string;
  index: number;
  nbDiscussions?: number | null;
  nbMessages?: number | null;
  lastMessage?: ForumLastMessage | null;
}

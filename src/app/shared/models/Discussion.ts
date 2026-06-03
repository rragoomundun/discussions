export interface DiscussionUser {
  id: number;
  name: string;
}

export interface DiscussionLastMessage {
  messageId: number;
  date: string;
  user: DiscussionUser;
}

export interface Discussion {
  id: number;
  title: string;
  open: boolean;
  createdAt: string;
  user: DiscussionUser;
  nbMessages: number;
  lastMessage: DiscussionLastMessage | null;
}

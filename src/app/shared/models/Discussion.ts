export interface DiscussionUser {
  id: number;
  name: string;
}

export interface DiscussionAuthor {
  id: number;
  name: string;
  image: string | null;
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

export interface DiscussionDetailForum {
  id: number;
  name: string;
}

export interface DiscussionDetailCategory {
  id: number;
  name: string;
}

export interface DiscussionDetail {
  id: number;
  title: string;
  open: boolean;
  forum: DiscussionDetailForum;
  category: DiscussionDetailCategory;
  author: DiscussionAuthor;
  createdAt: Date;
  nbPages: number;
}

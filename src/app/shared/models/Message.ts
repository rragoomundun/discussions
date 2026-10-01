export interface MessageAuthor {
  id: number;
  name: string;
  image: string | null;
  role: string;
  signature: string | null;
  isStarter: boolean;
  active: boolean;
}

export interface MessageEditor {
  id: number;
  name: string;
  active: boolean;
}

export interface Message {
  id: number;
  message: string;
  date: string;
  editedDate: string | null;
  editionComment: string | null;
  author: MessageAuthor;
  editor: MessageEditor | null;
}

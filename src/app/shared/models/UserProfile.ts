export interface UserProfile {
  name: string;
  role: 'admin' | 'moderator' | 'regular';
  image: string | null;
  nbDiscussions: number;
  nbMessages: number;
  createdAt: Date;
}

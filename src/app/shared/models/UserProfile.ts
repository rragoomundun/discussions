export interface UserProfile {
  name: string;
  role: 'admin' | 'moderator' | 'regular';
  image: string | null;
  active: boolean;
  nbDiscussions: number;
  nbMessages: number;
  createdAt: Date;
}

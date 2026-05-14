export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'regular';
  image: string | null;
  birthday: string | null;
  biography: string | null;
  location: string | null;
  gender: 'male' | 'female' | null;
  signature: string | null;
  active: boolean;
  createdAt: Date;
}

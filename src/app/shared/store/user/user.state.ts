import { User } from '../../models/User';

export interface UserState {
  user: User | null;
  onGetUser: string;
}

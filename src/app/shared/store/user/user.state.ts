import { User } from '../../models/User';

export interface UserState {
  user: User | null | undefined;
  onGetUser: string;
  onUpdateEmail: string;
  onUpdatePersonalInformation: string;
  onUpdateSignature: string;
}

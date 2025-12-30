import { AuthState } from './auth/auth.state';
import { ConfigState } from './config/config.state';
import { UserState } from './user/user.state';
export interface AppState {
  config: ConfigState;
  user: UserState;
  auth: AuthState;
}

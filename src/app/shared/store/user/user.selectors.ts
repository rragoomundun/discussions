import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

import { UserState } from './user.state';

export const selectUser = (state: AppState) => state.user;

export const selectUserModel = createSelector(
  selectUser,
  (state: UserState) => state.user,
);

export const selectOnGetUser = createSelector(
  selectUser,
  (state: UserState) => state.onGetUser,
);

export const selectOnUpdateEmail = createSelector(
  selectUser,
  (state: UserState) => state.onUpdateEmail,
);

export const selectOnUpdatePersonalInformation = createSelector(
  selectUser,
  (state: UserState) => state.onUpdatePersonalInformation,
);

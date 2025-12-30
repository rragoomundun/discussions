import { createReducer, on } from '@ngrx/store';

import { UserState } from './user.state';

import * as UserActions from './user.actions';

export const initialState: UserState = {
  user: null,
  onGetUser: 'false',
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.getUser, (state) => ({
    ...state,
    onGetUser: 'true',
  })),
  on(UserActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    onGetUser: 'success',
  })),
  on(UserActions.getUserFailure, (state) => ({
    ...state,
    onGetUser: 'error',
  })),
);

import { createReducer, on } from '@ngrx/store';

import { UserState } from './user.state';

import * as UserActions from './user.actions';

export const initialState: UserState = {
  user: undefined,
  onGetUser: 'false',
  onUpdateEmail: 'false',
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
    user: null,
    onGetUser: 'error',
  })),

  on(UserActions.initUpdateEmail, (state) => ({
    ...state,
    onUpdateEmail: 'false',
  })),
  on(UserActions.updateEmail, (state) => ({
    ...state,
    onUpdateEmail: 'true',
  })),
  on(UserActions.updateEmailSuccess, (state, { email }) => ({
    ...state,
    user: state.user ? { ...state.user, email } : state.user,
    onUpdateEmail: 'success',
  })),
  on(UserActions.updateEmailFailure, (state) => ({
    ...state,
    onUpdateEmail: 'error',
  })),

  on(UserActions.updateProfilePicture, (state, { image }) => ({
    ...state,
    user: state.user ? { ...state.user, image } : state.user,
  })),
);

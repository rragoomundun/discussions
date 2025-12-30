import { createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';

import * as AuthActions from './auth.actions';

export const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.logout, (state) => ({
    ...state,
  })),
);

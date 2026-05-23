import { createAction, props } from '@ngrx/store';

import { User } from '../../models/User';

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{ user: User }>(),
);
export const getUserFailure = createAction('[User] Get User Failure');

export const initUpdateEmail = createAction('[User] Init Update Email');
export const updateEmail = createAction(
  '[User] Update Email',
  props<{ email: string }>(),
);
export const updateEmailSuccess = createAction(
  '[User] Update Email Success',
  props<{ email: string }>(),
);
export const updateEmailFailure = createAction('[User] Update Email Failure');

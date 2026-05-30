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

export const updateProfilePicture = createAction(
  '[User] Update Profile Picture',
  props<{ image: string | null }>(),
);

export const initUpdatePersonalInformation = createAction(
  '[User] Init Update Personal Information',
);
export const updatePersonalInformation = createAction(
  '[User] Update Personal Information',
  props<{
    birthday: string | null;
    location: string | null;
    gender: 'male' | 'female' | null;
    biography: string | null;
  }>(),
);
export const updatePersonalInformationSuccess = createAction(
  '[User] Update Personal Information Success',
  props<{
    birthday: string | null;
    location: string | null;
    gender: 'male' | 'female' | null;
    biography: string | null;
  }>(),
);
export const updatePersonalInformationFailure = createAction(
  '[User] Update Personal Information Failure',
);

export const initUpdateSignature = createAction('[User] Init Update Signature');
export const updateSignature = createAction(
  '[User] Update Signature',
  props<{ signature: string | null }>(),
);
export const updateSignatureSuccess = createAction(
  '[User] Update Signature Success',
  props<{ signature: string | null }>(),
);
export const updateSignatureFailure = createAction('[User] Update Signature Failure');

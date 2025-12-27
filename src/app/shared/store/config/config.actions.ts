import { createAction, props } from '@ngrx/store';

export const getExists = createAction('[Config] Get Exists');
export const getExistsSuccess = createAction(
  '[Config] Get Exists Success',
  props<{ exists: boolean }>(),
);
export const getExistsFailure = createAction('[Config] Get Exists Failure');

export const init = createAction(
  '[Config] Init',
  props<{ title: string; lang: string }>(),
);
export const initSuccess = createAction(
  '[Config] Init Success',
  props<{ title: string; lang: string }>(),
);
export const initFailure = createAction('[Config] Init Failure');

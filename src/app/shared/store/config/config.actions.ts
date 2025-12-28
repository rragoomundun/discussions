import { createAction, props } from '@ngrx/store';

import { Config } from '../../models/Config';

export const getExists = createAction('[Config] Get Exists');
export const getExistsSuccess = createAction(
  '[Config] Get Exists Success',
  props<{ config: boolean; admin: boolean }>(),
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

export const getConfig = createAction('[Config] Get Config');
export const getConfigSuccess = createAction(
  '[Config] Get Config Success',
  props<{ config: Config }>(),
);
export const getConfigFailure = createAction('[Config] Get Config Failure');

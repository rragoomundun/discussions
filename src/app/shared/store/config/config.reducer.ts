import { createReducer, on } from '@ngrx/store';

import { ConfigState } from './config.state';

import * as ConfigActions from './config.actions';

export const initialState: ConfigState = {
  exists: null,
  config: null,
  bottomLinks: [],
  onGetExists: 'false',
  onInit: 'false',
  onGetConfig: 'false',
  onUpdateConfig: 'false',
};

export const configReducer = createReducer(
  initialState,

  on(ConfigActions.getExists, (state) => ({
    ...state,
    onGetExists: 'true',
  })),
  on(ConfigActions.getExistsSuccess, (state, { config, admin }) => {
    return {
      ...state,
      exists: {
        config,
        admin,
      },
      onGetExists: 'success',
    };
  }),
  on(ConfigActions.getExistsFailure, (state) => ({
    ...state,
    onGetExists: 'error',
  })),

  on(ConfigActions.init, (state) => ({
    ...state,
    onInit: 'true',
  })),
  on(ConfigActions.initSuccess, (state, { title, lang }) => ({
    ...state,
    exists: {
      config: true,
      admin: false,
    },
    config: {
      title,
      lang,
      logo: '',
      favicon: '',
      description: '',
      meta_description: '',
      show_title: true,
      show_logo: false,
      created_at: new Date(),
    },
    onInit: 'success',
  })),
  on(ConfigActions.initFailure, (state) => ({
    ...state,
    onInit: 'error',
  })),

  on(ConfigActions.getConfig, (state) => ({
    ...state,
    onGetConfig: 'true',
  })),
  on(ConfigActions.getConfigSuccess, (state, { config, bottomLinks }) => ({
    ...state,
    config,
    bottomLinks,
    onGetConfig: 'success',
  })),
  on(ConfigActions.getConfigFailure, (state) => ({
    ...state,
    onGetConfig: 'error',
  })),

  on(ConfigActions.initUpdateConfig, (state) => ({
    ...state,
    onUpdateConfig: 'false',
  })),
  on(ConfigActions.updateConfig, (state) => ({
    ...state,
    onUpdateConfig: 'true',
  })),
  on(ConfigActions.updateConfigSuccess, (state, { config }) => ({
    ...state,
    config: {
      title: config.title,
      lang: config.lang,
      logo: config.logo,
      favicon: config.favicon,
      description: config.description,
      meta_description: config.meta_description,
      show_title: config.show_title,
      show_logo: config.show_logo,
      created_at: <Date>state.config?.created_at,
    },
    onUpdateConfig: 'success',
  })),
  on(ConfigActions.updateConfigFailure, (state) => ({
    ...state,
    onUpdateConfig: 'error',
  })),
);

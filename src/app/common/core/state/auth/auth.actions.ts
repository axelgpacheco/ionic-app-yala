// src/app/state/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_FAILURE } from './types';

export const login = createAction(
  LOGIN,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: any }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGIN);

export const logoutSuccess = createAction(LOGIN_SUCCESS);

export const logoutFailure = createAction(
  LOGOUT_FAILURE,
  props<{ error: string }>()
);

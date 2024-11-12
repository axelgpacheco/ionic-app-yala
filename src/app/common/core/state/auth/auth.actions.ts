// src/app/state/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const LOGOUT_FAILURE = '[Auth] Logout Failure';

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

export const logout = createAction(LOGOUT);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logoutFailure = createAction(
  LOGOUT_FAILURE,
  props<{ error: string }>()
);

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    error
  })),
  on(AuthActions.logoutSuccess, (state): AuthState => ({
    ...state,
    user: null,
    error: null
  })),
  on(AuthActions.logoutFailure, (state, { error }): AuthState => ({
    ...state,
    error
  }))
);

// src/app/state/auth/auth.reducer.ts
import { createReducer, on, State } from '@ngrx/store';
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
  on(AuthActions.loginSuccess, ( state, { user }): AuthState => ({ ...state, user, error: null })),
);

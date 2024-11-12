// src/app/state/auth/auth.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);


export const selectUserUid = createSelector(
  selectAuthState,
  (authState) => authState.user?.uid || null
);

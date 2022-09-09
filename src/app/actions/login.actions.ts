import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction('Login',props<{ success: boolean; token: string }>());
export const logoutSuccess = createAction('Logout');
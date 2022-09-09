import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutSuccess } from '../actions/login.actions';

export const initialState = {success:false,token:""};

export const loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state:{success:boolean;token:string},result) => {return {...state,success:result.success,token:result.token};}),
  on(logoutSuccess, (state:{success:boolean;token:string}) => {return {success:false,token:""};}),
);
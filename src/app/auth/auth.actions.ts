import { createAction, props } from "@ngrx/store";


export const CALL_REGISTER = '[Auth] Call Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Fail';
export const CALL_LOGIN = '[Auth] Call Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const CALL_LOGOUT = '[Auth] Call Logout';
export const CALL_AUTO_LOGIN = '[Auth] Call Auto Login';
export const AUTO_LOGIN_SUCCESS = '[Auth] Auto Login Success';
export const AUTO_LOGIN_FAIL = '[Auth] Auto Login Fail';


export const callRegister = createAction(
    CALL_REGISTER,
    props<{email: string, password: string}>()
);

export const registerSuccess = createAction(
    REGISTER_SUCCESS,
    props<{message: any}>()
);

export const registerFail = createAction(
    REGISTER_FAIL,
    props<{error: any}>()
);

export const callLogin = createAction(
    CALL_LOGIN,
    props<{email: string, password: string}>()
);

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const loginFail = createAction(
    LOGIN_FAIL,
    props<{error: any}>()  
);

export const callLogout = createAction(CALL_LOGOUT);

export const callAutoLogin = createAction(CALL_AUTO_LOGIN);

export const autoLoginSuccess = createAction(AUTO_LOGIN_SUCCESS);

export const autoLoginFail = createAction(
    AUTO_LOGIN_FAIL,
    props<{error:any}>()
);

export type AuthActions = 
    typeof callRegister |
    typeof registerSuccess |
    typeof registerFail |
    typeof callLogin |
    typeof loginSuccess |
    typeof loginFail |
    typeof callLogout |
    typeof callAutoLogin |
    typeof autoLoginSuccess |
    typeof autoLoginFail
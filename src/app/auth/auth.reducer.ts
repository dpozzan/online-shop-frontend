import { createReducer, on } from "@ngrx/store";
import * as authActions from "./auth.actions";

export interface AuthState {
    isLoggedIn: boolean;
    message: string | null;
    error: any;
}

const initialState: AuthState = {
    isLoggedIn: false,
    message: null,
    error: null
}


export const authReducer = createReducer(
    initialState,
    on(authActions.registerSuccess, (state, { message }) => ({...state, message: message, error: null})),
    on(authActions.registerFail, (state, { error }) => ({...state, message: null, error})),
    on(authActions.loginSuccess, (state) => ({...state, isLoggedIn: true, message: null, error: null})),
    on(authActions.loginFail, (state, { error }) => ({...state, isLoggedIn: false, message: null, error: error})),
    on(authActions.callLogout, (state) => ({...state, isLoggedIn: false})),
    on(authActions.autoLoginSuccess, (state) => ({...state, isLoggedIn: true})),
    on(authActions.autoLoginFail, (state, { error }) => ({...state, error: error}))
)
import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffects implements OnDestroy {
    authTimeout: any;

    register$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.callRegister),
        switchMap((res) => {
            return this.authService.register({email: res.email, password: res.password}).pipe(
            map((success) => {
                return authActions.registerSuccess({message: success.message});
            }),
            catchError((error) => {
                return of(authActions.registerFail({error: error.toString()}))
            })
        )}))
    )

    login$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.callLogin),
        switchMap((res) => this.authService.login({email: res.email, password: res.password}).pipe(
            tap((response) => {
                localStorage.setItem('auth', JSON.stringify(response));
                const now = new Date().getTime();
                const expirationTime = response.exp * 1000;
                const timeSpan = expirationTime - now;
                this.authTimeout = setTimeout(() => {
                  this.store.dispatch(authActions.callLogout())
                }, timeSpan)
            }),
            map(() => authActions.loginSuccess()),
            catchError((error) => of(authActions.loginFail({error})))
        ))
    ))

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.callLogout),
        tap(() => {
            localStorage.removeItem('auth');
            this.router.navigate(['/products'])
        })
    ), { dispatch: false })

    autoLogin$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.callAutoLogin),
        map(() => {
            const authSetting = JSON.parse(localStorage.getItem('auth'));
            if (authSetting && authSetting.token) {
              const now = new Date().getTime();
              const expirationTime = authSetting.exp * 1000;
              const timeSpan = expirationTime - now;
              if(expirationTime > now) {
                this.authTimeout = setTimeout(() => {
                  this.store.dispatch(authActions.callLogout())
                }, timeSpan);

                return authActions.autoLoginSuccess();
              }
                this.router.navigate(['auth'], { queryParams: { mode: 'login' } })
                return authActions.autoLoginFail({error: 'Session expired. Please log in again.'});  
            }

            return authActions.autoLoginFail({error: null});
        })
    ))

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private router: Router,
        private store: Store
    ) {}

    ngOnDestroy(): void {
        clearTimeout(this.authTimeout)
    }
}
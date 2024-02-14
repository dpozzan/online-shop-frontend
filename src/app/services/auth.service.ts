import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  isLoggedIn: Subject<boolean> = new Subject<boolean>();
  authTimeout: any;

  constructor(private http: HttpClient) { }

  register(body: {email: string, password: string}): Observable<{message: string}> {
    return this.http.post<{message: string}>('http://localhost:8080/signup', body).pipe(
      catchError(errorResp => {
        throw new Error(errorResp.error.message);
      })
    );
  }

  login(body: {email: string, password: string}): Observable<any> {
    return this.http.post<{exp: number, token: string}>("http://localhost:8080/login", body)
  }

  checkLoginStatus() {
    const authSetting = JSON.parse(localStorage.getItem('auth'));
    if (authSetting && authSetting.token) {
      const now = new Date().getTime();
      const expirationTime = authSetting.exp * 1000;
      
      if(expirationTime > now) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.authTimeout);
  }


}

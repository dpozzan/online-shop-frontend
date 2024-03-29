import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedToken = JSON.parse(localStorage.getItem('auth'))?.token;
    if(savedToken){
      const modifiedRequest = request.clone({headers: request.headers.set('Authorization', savedToken)})
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}

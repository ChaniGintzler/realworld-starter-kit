import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, Subject, throttleTime, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private throttleLogout = new Subject<void>();
 
  constructor(public authService: AuthService, private router:Router) {
    this.throttleLogout.pipe(throttleTime(5000)).subscribe(() => {
     authService.logout();
    });
  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      }
    });
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401|| response.status === 403) {
          this.throttleLogout.next();
        }
        return throwError(response);
      }))
  }
}
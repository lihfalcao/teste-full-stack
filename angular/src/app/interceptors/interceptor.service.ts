import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { AuthStateService } from '../login/authstate.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private authState: AuthStateService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authState.snapshot.token;

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq) as Observable<HttpEvent<any>>;
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !this.isRefreshing) {
        this.isRefreshing = true;

        return this.authService.refresh().pipe(
          switchMap((res: any) => {
            localStorage.setItem('token', res.token);
            this.authState.setAuth(res.token, res.user);

            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.token}` },
            });
            return next.handle(newReq);
          }),
          catchError(() => {
            this.authState.clearAuth();
            return throwError(() => error);
          }),
          () => {
            this.isRefreshing = false;
            return of(null);
          }
        );
      }

      return throwError(() => error);
    });
  }
}

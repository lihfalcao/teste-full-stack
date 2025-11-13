import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('HTTP Request:', request.method, request.url);
    
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          console.log('HTTP Response:', event);
        },
        error: (error) => {
          console.error('HTTP Error:', error);
        }
      })
    );
  }
}


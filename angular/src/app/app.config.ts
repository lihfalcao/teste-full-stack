import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';

import { AuthStateService } from './login/authstate.service';
import { AuthInterceptor } from './interceptors/interceptor.service';

export function initializeAuthFactory(authState: AuthStateService) {
  return () => {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      const token = window.localStorage.getItem('token');
      if (token) {
        authState.setAuth(token, null);
      }
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNgxMask(),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuthFactory,
      deps: [AuthStateService],
      multi: true,
    },
  ],
};

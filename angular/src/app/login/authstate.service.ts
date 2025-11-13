import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private stateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  state$ = this.stateSubject.asObservable();

  setAuth(token: string, user: any = null) {
    this.stateSubject.next({
      isAuthenticated: true,
      token,
      user,
    });
  }

  clearAuth() {
    this.stateSubject.next({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  }

  get snapshot(): AuthState {
    return this.stateSubject.value;
  }
}

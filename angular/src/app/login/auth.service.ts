import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStateService } from './authstate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient, private authState: AuthStateService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http
      .post(`${this.apiUrl}/login`, credentials, { headers })
      .pipe(
        tap((res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }

          if (res.refresh_token) {
            localStorage.setItem('refresh_token', res.refresh_token);
          }

          this.authState.setAuth(res.token ?? null, res.user ?? null);
        })
      );
  }

  refresh(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');

    return this.http.post(
      `${this.apiUrl}/refresh`,
      { refresh_token: refresh },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      }
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

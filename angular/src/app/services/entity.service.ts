import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity, Specialty } from '../models/entity.model';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private apiUrl = 'http://localhost:8081/api/entities';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  create(entity: Partial<Entity>): Observable<Entity> {
    return this.http.post<Entity>(this.apiUrl, entity, {
      headers: this.getHeaders(),
    });
  }

  update(id: number, entity: Partial<Entity>): Observable<Entity> {
    return this.http.put<Entity>(`${this.apiUrl}/${id}`, entity, {
      headers: this.getHeaders(),
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getspecialities(): Observable<Specialty[]> {
    const baseUrl = this.apiUrl.replace('/entities', '');
    return this.http.get<Specialty[]>(`${baseUrl}/specialities`, {
      headers: this.getHeaders(),
    });
  }
}

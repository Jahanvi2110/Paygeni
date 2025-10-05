import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  storeUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated() {
    const user = this.getUser();
    return user && user.id;
  }

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'ADMIN';
  }

  getCurrentUser() {
    return this.getUser();
  }

  logout() {
    localStorage.removeItem('user');
  }
}
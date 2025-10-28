import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface UserAccount {
  id: number | null;
  firstName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  employeeId?: number;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private apiUrl = `${environment.apiUrl}/auth`; // Use auth endpoints

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.apiUrl}/signup`, user);
  }

  updateUser(id: number, user: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}

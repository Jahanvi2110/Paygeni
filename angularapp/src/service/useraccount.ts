import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface UserAccount {
  id?: number;
  username: string;
  password: string;
  role: string;
  employeeId?: number; // link to employee
}

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private baseUrl = '/api/user-accounts';  // Make sure this matches your backend endpoint

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.baseUrl);
  }

  // Get a user by ID
  getUserById(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.baseUrl}/${id}`);
  }

  // Create a new user
  createUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.baseUrl, user);
  }

  // Update an existing user
  updateUser(id: number, user: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

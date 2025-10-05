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
 // Create a new user
createUser(user: UserAccount): Observable<UserAccount> {
  // Convert employeeId → employee object for backend
  const payload: any = {
    username: user.username,
    password: user.password,
    role: user.role,
    employee: user.employeeId ? { id: user.employeeId } : null
  };
  return this.http.post<UserAccount>(this.baseUrl, payload);
}

// Update an existing user
updateUser(id: number, user: UserAccount): Observable<UserAccount> {
  const payload: any = {
    username: user.username,
    password: user.password,
    role: user.role,
    employee: user.employeeId ? { id: user.employeeId } : null
  };
  return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, payload);
}
// Login user
login(username: string, password: string): Observable<UserAccount> {
  return this.http.post<UserAccount>(`${this.baseUrl}/login`, { username, password });
}


  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

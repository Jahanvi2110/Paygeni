import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface UserAccount {
  id: number | null;
  username: string;
  password: string;
  role: string;
  employeeId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private apiUrl = `${environment.apiUrl}/users`; // Adjust endpoint as needed

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.apiUrl, user);
  }

  updateUser(id: number, user: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

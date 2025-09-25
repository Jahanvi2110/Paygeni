import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  private isLoggedIn = false;

  constructor(private router: Router) {
    // Check if user is already logged in from localStorage
    this.checkStoredAuth();
  }

  // Login method
  login(email: string, phone: string, password: string): boolean {
    // Simulate authentication logic
    // In a real app, you would call your backend API here
    
    const isAdmin = email.includes('admin') || email.includes('manager');
    
    this.currentUser = {
      email: email,
      phone: phone,
      role: isAdmin ? 'admin' : 'employee',
      name: isAdmin ? 'Admin User' : 'Employee User',
      id: isAdmin ? 'ADM001' : 'EMP001'
    };
    
    this.isLoggedIn = true;
    
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    return true;
  }

  // Logout method
  logout(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    // Check both in-memory flag and localStorage
    const storedUser = localStorage.getItem('currentUser');
    const storedLogin = localStorage.getItem('isLoggedIn');
    
    if (storedUser && storedLogin === 'true' && !this.isLoggedIn) {
      // Restore session from localStorage
      this.currentUser = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }
    
    return this.isLoggedIn;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  // Check if user is employee
  isEmployee(): boolean {
    return this.currentUser && this.currentUser.role === 'employee';
  }

  // Get current user
  getCurrentUser(): any {
    return this.currentUser;
  }

  // Check stored authentication
  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedLogin = localStorage.getItem('isLoggedIn');
    
    if (storedUser && storedLogin === 'true') {
      this.currentUser = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }
  }

  // Redirect based on role
  redirectBasedOnRole(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.isAdmin()) {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.isEmployee()) {
      this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

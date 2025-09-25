import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // User not logged in, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.authService.isAdmin()) {
      // User is not admin, redirect to employee dashboard
      this.router.navigate(['/employee-dashboard']);
      return false;
    }

    // User is authenticated and is admin
    return true;
  }
}

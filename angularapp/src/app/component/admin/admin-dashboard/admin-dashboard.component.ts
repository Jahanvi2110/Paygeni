import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // User information
  currentUser: any = null;
  
  // Employee list
  // employees: any[] = []; // Removed - no longer displaying employees list
  isLoading = false;
  
  // Dashboard statistics
  totalEmployees = 0;
  totalAdmins = 0;
  
  // Recent activities (dynamic based on actual data)
  recentActivities: any[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Get current user information
    this.currentUser = this.authService.getCurrentUser();
    
    // If no user is logged in, create a demo admin user for testing
    if (!this.currentUser) {
      this.currentUser = {
        email: 'admin@company.com',
        phone: '1234567890',
        role: 'admin',
        name: 'Demo Admin',
        id: 'ADM001'
      };
    }
    
    // Load dashboard data
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.isLoading = true;
    
    // Fetch all users (employees and admins)
    this.http.get<any[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          // this.employees = users; // Removed - no longer displaying employees list
          this.totalEmployees = users.filter(user => user.role === 'EMPLOYEE').length;
          this.totalAdmins = users.filter(user => user.role === 'ADMIN').length;
          
          // Generate recent activities based on actual signups
          this.generateRecentActivities(users);
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          this.isLoading = false;
        }
      });
  }

  private generateRecentActivities(users: any[]) {
    this.recentActivities = [];
    
    // Show recent signups (last 3 users)
    const recentUsers = users.slice(-3).reverse();
    
    recentUsers.forEach((user, index) => {
      this.recentActivities.push({
        icon: 'employee',
        title: `${user.role === 'ADMIN' ? 'New admin' : 'New employee'} signed up: ${user.firstName}`,
        time: index === 0 ? 'Just now' : `${index + 1} hours ago`
      });
    });
    
    // If no users, show empty state message
    if (users.length === 0) {
      this.recentActivities.push({
        icon: 'info',
        title: 'No employees have signed up yet',
        time: 'Waiting for signups'
      });
    }
  }

  // Method to refresh dashboard data
  refreshDashboard() {
    this.loadDashboardData();
  }

  // Logout method
  logout() {
    this.authService.logout();
  }
}

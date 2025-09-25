import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

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
  
  // Dashboard statistics
  totalEmployees = 42;
  totalPayrolls = 10;
  pendingApprovals = 3;
  totalPayrollAmount = '₹2.4M';
  
  // Recent activities
  recentActivities = [
    {
      icon: 'employee',
      title: 'New employee added: John Smith joined the team',
      time: '2 hours ago'
    },
    {
      icon: 'payroll',
      title: 'Payroll processed: December 2024 payroll completed',
      time: '1 day ago'
    },
    {
      icon: 'attendance',
      title: 'Attendance updated: 15 employees marked present',
      time: '3 hours ago'
    }
  ];

  constructor(private authService: AuthService) {}

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
    // Simulate API calls
    // this.employeeService.getTotalEmployees().subscribe(data => {
    //   this.totalEmployees = data;
    // });
    
    // this.payrollService.getTotalPayrolls().subscribe(data => {
    //   this.totalPayrolls = data;
    // });
    
    // this.approvalService.getPendingApprovals().subscribe(data => {
    //   this.pendingApprovals = data;
    // });
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

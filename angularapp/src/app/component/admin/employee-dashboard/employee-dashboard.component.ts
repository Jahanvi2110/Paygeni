import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // User information
  currentUser: any = null;
  
  // Employee Information
  employeeName = 'John Smith';
  employeeId = 'EMP001';
  department = 'Engineering';
  position = 'Software Developer';
  joinDate = '2023-01-15';
  
  // Salary Information
  basicSalary = 75000;
  allowances = 15000;
  totalEarnings = 90000;
  deductions = 12000;
  netSalary = 78000;
  
  // Payroll Status
  currentMonth = 'December 2024';
  lastPayDate = '2024-11-30';
  nextPayDate = '2024-12-31';
  payStatus = 'Pending';
  
  // Recent Transactions
  recentTransactions = [
    {
      date: '2024-11-30',
      type: 'Salary',
      amount: 78000,
      status: 'Paid',
      description: 'November 2024 Salary'
    },
    {
      date: '2024-10-31',
      type: 'Salary',
      amount: 78000,
      status: 'Paid',
      description: 'October 2024 Salary'
    },
    {
      date: '2024-09-30',
      type: 'Bonus',
      amount: 10000,
      status: 'Paid',
      description: 'Q3 Performance Bonus'
    }
  ];
  
  // Leave Information
  totalLeaves = 21;
  usedLeaves = 8;
  remainingLeaves = 13;
  
  // Attendance Summary
  totalWorkingDays = 22;
  presentDays = 20;
  absentDays = 2;
  attendancePercentage = 90.9;

  // Flexible Shifts Data
  currentShift = {
    name: 'Day Shift',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    isActive: true
  };
  canPunchIn = true;
  canPunchOut = false;

  // Loans & Advances Data
  activeLoanAmount = 25000;
  activeLoansCount = 1;
  advanceBalance = 15000;

  // Reports Data
  selectedReportType = 'attendance';
  selectedPeriod = 'current-month';

  constructor(
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    // Get current user information
    this.currentUser = this.authService.getCurrentUser();
    
    // If no user is logged in, create a demo employee user for testing
    if (!this.currentUser) {
      this.currentUser = {
        email: 'demo@employee.com',
        phone: '1234567890',
        role: 'employee',
        name: 'Demo Employee',
        id: 'EMP001'
      };
    }
    
    // Load employee data
    this.loadEmployeeData();
  }

  private loadEmployeeData() {
    // You can fetch real data from services here
    // this.employeeService.getEmployeeData().subscribe(data => {
    //   this.employeeName = data.name;
    //   this.basicSalary = data.salary;
    //   // ... other properties
    // });
  }

  // Method to refresh employee data
  refreshData() {
    this.loadEmployeeData();
  }

  // Method to download payslip
  downloadPayslip(month: string) {
    alert(`Downloading payslip for ${month}`);
    // Implement payslip download functionality
  }

  // Method to request leave
  requestLeave() {
    alert('Opening leave request form');
    // Navigate to leave request form
  }

  // Logout method
  logout() {
    this.authService.logout();
  }

  goBack() {
    this.location.back();
  }

  // Flexible Shifts Methods
  punchIn() {
    this.canPunchIn = false;
    this.canPunchOut = true;
    this.currentShift.isActive = true;
    alert('✅ Punched In successfully!');
  }

  punchOut() {
    this.canPunchIn = true;
    this.canPunchOut = false;
    this.currentShift.isActive = false;
    alert('✅ Punched Out successfully!');
  }

  // Loans & Advances Methods
  requestAdvance() {
    const amount = prompt('Enter advance amount:');
    if (amount && !isNaN(Number(amount))) {
      alert(`✅ Advance request of ₹${amount} submitted successfully!`);
    }
  }

  viewLoanHistory() {
    alert('📋 Loan History:\n\n• Personal Loan: ₹25,000 (Active)\n• Advance Request: ₹5,000 (Dec 2024)\n• Advance Request: ₹3,000 (Nov 2024)');
  }

  // Reports Methods
  generateReport() {
    alert(`📊 Generating ${this.selectedReportType} report for ${this.selectedPeriod}...`);
  }

  downloadReport() {
    alert(`📥 Downloading ${this.selectedReportType} report as Excel file...`);
  }

  // Additional Methods
  updateProfile() {
    alert('👤 Profile update form will open here');
  }

  viewPerformance() {
    alert('📈 Performance Dashboard:\n\n• Overall Rating: 4.2/5\n• Attendance: 90.9%\n• Goals Achieved: 85%\n• Team Collaboration: Excellent');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../service/auth.service';
import { PayrollService, Payroll } from '../../../service/payroll.service';
import { LeaveRequestService, LeaveRequest } from '../../../service/payroll.service';
import { AdvanceRequestService, AdvanceRequest } from '../../../service/payroll.service';
import { environment } from '../../../../environments/environment';

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
  employeeName = '';
  employeeId = '';
  department = 'General';
  position = 'Employee';
  joinDate = this.getRandomJoinDate();
  email = '';
  phone = '';
  
  // Payroll Information
  currentPayroll: Payroll | null = null;
  payrollHistory: Payroll[] = [];
  isLoadingPayroll = false;
  
  // Leave Information
  leaveRequests: LeaveRequest[] = [];
  isLoadingLeave = false;
  
  // Advance Information
  advanceRequests: AdvanceRequest[] = [];
  outstandingAmount = 0;
  isLoadingAdvance = false;
  
  // Modal states
  showLeaveModal = false;
  showAdvanceModal = false;
  showPayrollModal = false;
  isSubmittingLeave = false;
  isSubmittingAdvance = false;

  // Request objects
  leaveRequest = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  advanceRequest = {
    requestAmount: 0,
    reason: '',
    repaymentPlan: ''
  };

  // Simplified dashboard data
  totalLeavesTaken = 0;
  totalHoursWorked = 0;
  activeLoanAmount = 0;
  activeLoansCount = 0;
  canPunchIn = true;
  canPunchOut = false;
  
  // Recent Transactions
  recentTransactions: any[] = [];
  
  // Leave Information
  totalLeaves = 21;
  usedLeaves = 0;
  remainingLeaves = 21;
  
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
  // Loans & Advances Data
  advanceBalance = 15000;

  // Reports Data
  selectedReportType = 'attendance';
  selectedPeriod = 'current-month';
  
  // Additional properties for template compatibility
  currentMonth = this.getCurrentMonth();
  payStatus = 'Pending';
  nextPayDate = this.getNextPayDate();
  netSalary = 0;
  pendingPayments: any[] = [];
  pendingItems: any[] = [];

  // Tooltip states
  showLeavesTooltip = false;
  showLoansTooltip = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private payrollService: PayrollService,
    private leaveRequestService: LeaveRequestService,
    private advanceRequestService: AdvanceRequestService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('🚀 LOADING EMPLOYEE DASHBOARD');
    
    // Get current user from AuthService
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      console.log('🔍 Current user:', this.currentUser);
      
      // Load user data into dashboard
      this.loadUserData();
      
      // Load all dashboard data
      this.loadDashboardData();
    } else {
      // If no user is logged in, redirect to login
      console.log('❌ No user logged in, redirecting to login');
      this.location.back();
      return;
    }
  }

  loadUserData() {
    // Load user data from the logged-in user
    this.employeeName = this.currentUser.firstName || this.currentUser.username;
    this.email = this.currentUser.email;
    this.phone = this.currentUser.phoneNumber || 'Not provided';
    this.employeeId = this.currentUser.id ? `EMP${this.currentUser.id}` : 'EMP001';
    
    console.log('✅ User data loaded:', {
      name: this.employeeName,
      email: this.email,
      phone: this.phone,
      id: this.employeeId
    });

    // Load real employee data from database
    this.loadRealEmployeeData();
  }

  loadRealEmployeeData() {
    if (!this.currentUser?.id) return;
    
    // Load employee data from database
    this.http.get<any>(`${environment.apiUrl}/employees/${this.currentUser.id}`)
      .subscribe({
        next: (employee) => {
          console.log('✅ Loaded employee data from database:', employee);
          this.employeeName = `${employee.firstName} ${employee.lastName || ''}`.trim();
          this.department = employee.department || 'General';
          this.position = employee.designation || 'Employee';
          this.joinDate = employee.hireDate || this.getRandomJoinDate();
          this.email = employee.email || this.email;
          this.phone = employee.phoneNumber || this.phone;
        },
        error: (error) => {
          console.error('❌ Error loading employee data:', error);
          // Keep the fallback values from currentUser
        }
      });
  }

  loadDashboardData() {
    if (!this.currentUser?.id) {
      console.error('No user ID found');
      return;
    }

    const employeeId = this.currentUser.id;
    
    // Load payroll data
    this.loadPayrollData(employeeId);
    
    // Load leave requests
    this.loadLeaveRequests(employeeId);
    
    // Load advance requests
    this.loadAdvanceRequests(employeeId);
    
    // Load simplified dashboard data
    this.loadSimplifiedData();
  }

  loadSimplifiedData() {
    // Calculate total leaves taken
    this.totalLeavesTaken = this.leaveRequests
      .filter(leave => leave.status === 'APPROVED')
      .reduce((total, leave) => {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return total + days;
      }, 0);

    // Calculate active loan amount
    this.activeLoanAmount = this.advanceRequests
      .filter(advance => advance.status === 'APPROVED')
      .reduce((total, advance) => total + (advance.requestAmount || 0), 0);

    // Count active loans
    this.activeLoansCount = this.advanceRequests
      .filter(advance => advance.status === 'APPROVED').length;

    // Simulate work hours (you can integrate with actual attendance data)
    this.totalHoursWorked = this.presentDays * 8; // 8 hours per day
  }

  loadPayrollData(employeeId: number) {
    this.isLoadingPayroll = true;
    
    // Get current payroll
    this.payrollService.getCurrentPayroll(employeeId).subscribe({
      next: (payroll) => {
        this.currentPayroll = payroll;
        this.updatePayrollDisplayData(payroll);
        console.log('✅ Current payroll loaded:', payroll);
        this.isLoadingPayroll = false;
      },
      error: (error) => {
        console.log('No current payroll found, creating one...');
        // Create payroll if it doesn't exist
        this.payrollService.createPayroll(employeeId).subscribe({
          next: (payroll) => {
            this.currentPayroll = payroll;
            this.updatePayrollDisplayData(payroll);
            console.log('✅ New payroll created:', payroll);
            this.isLoadingPayroll = false;
          },
          error: (createError) => {
            console.error('Error creating payroll:', createError);
            this.isLoadingPayroll = false;
          }
        });
      }
    });

    // Get payroll history
    this.payrollService.getPayrollsByEmployee(employeeId).subscribe({
      next: (payrolls) => {
        this.payrollHistory = payrolls;
        this.recentTransactions = payrolls.slice(0, 3).map(p => ({
          date: p.payDate || p.processedDate,
          type: 'Salary',
          amount: p.netSalary,
          status: p.status,
          description: `${p.payPeriod} Salary`
        }));
        
        // Update pending payments based on payroll data
        this.updatePendingPayments(payrolls);
        
        console.log('✅ Payroll history loaded:', payrolls);
      },
      error: (error) => {
        console.error('Error loading payroll history:', error);
      }
    });
  }

  updatePayrollDisplayData(payroll: Payroll) {
    if (payroll) {
      this.currentMonth = payroll.payPeriod;
      this.payStatus = payroll.status;
      this.netSalary = payroll.netSalary;
      this.nextPayDate = payroll.payDate || '2024-12-31';
    }
  }

  updatePendingPayments(payrolls: Payroll[]) {
    this.pendingPayments = [];
    
    // Add current month payroll if pending
    const currentPayroll = payrolls.find(p => p.status === 'PENDING');
    if (currentPayroll) {
      this.pendingPayments.push({
        type: 'Salary',
        amount: currentPayroll.netSalary,
        dueDate: currentPayroll.payDate || '2024-12-31',
        status: currentPayroll.status,
        description: `${currentPayroll.payPeriod} Salary`
      });
    }
    
    // Add any bonus payments
    const bonusPayrolls = payrolls.filter(p => p.bonus > 0 && p.status === 'PENDING');
    bonusPayrolls.forEach(payroll => {
      this.pendingPayments.push({
        type: 'Bonus',
        amount: payroll.bonus,
        dueDate: payroll.payDate || '2024-12-31',
        status: payroll.status,
        description: `${payroll.payPeriod} Bonus`
      });
    });
  }

  loadLeaveRequests(employeeId: number) {
    this.isLoadingLeave = true;
    
    this.leaveRequestService.getLeaveRequestsByEmployee(employeeId).subscribe({
      next: (requests) => {
        this.leaveRequests = requests;
        this.usedLeaves = requests
          .filter(r => r.status === 'APPROVED')
          .reduce((total, r) => total + r.totalDays, 0);
        this.remainingLeaves = this.totalLeaves - this.usedLeaves;
        console.log('✅ Leave requests loaded:', requests);
        this.isLoadingLeave = false;
      },
      error: (error) => {
        console.error('Error loading leave requests:', error);
        this.isLoadingLeave = false;
      }
    });
  }

  loadAdvanceRequests(employeeId: number) {
    this.isLoadingAdvance = true;
    
    this.advanceRequestService.getAdvanceRequestsByEmployee(employeeId).subscribe({
      next: (requests) => {
        this.advanceRequests = requests;
        console.log('✅ Advance requests loaded:', requests);
        this.isLoadingAdvance = false;
      },
      error: (error) => {
        console.error('Error loading advance requests:', error);
        this.isLoadingAdvance = false;
      }
    });

    // Get outstanding amount
    this.advanceRequestService.getOutstandingAmount(employeeId).subscribe({
      next: (response) => {
        this.outstandingAmount = response.outstandingAmount;
        console.log('✅ Outstanding amount:', this.outstandingAmount);
      },
      error: (error) => {
        console.error('Error loading outstanding amount:', error);
      }
    });
  }

  // Method to refresh employee data
  refreshData() {
    this.loadDashboardData();
  }

  // Method to download payslip
  downloadPayslip(month: string) {
    if (!this.currentPayroll) {
      alert('No payroll data available for download');
      return;
    }

    // Create payslip content
    const payslipContent = this.generatePayslipContent(this.currentPayroll);
    
    // Create and download file
    const blob = new Blob([payslipContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payslip_${this.employeeName}_${month.replace(' ', '_')}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    alert(`✅ Payslip for ${month} downloaded successfully!`);
  }

  generatePayroll() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.payrollService.createPayroll(currentUser.id).subscribe({
        next: (payroll) => {
          console.log('Payroll generated successfully:', payroll);
          this.currentPayroll = payroll;
          this.loadDashboardData();
          this.loadSimplifiedData(); // Refresh dashboard data
          alert(`Payroll generated successfully!\nPayroll ID: ${payroll.payrollId}\nNet Salary: ₹${payroll.netSalary}`);
        },
        error: (error) => {
          console.error('Error generating payroll:', error);
          alert('Failed to generate payroll: ' + (error.error?.message || error.message));
        }
      });
    } else {
      alert('User not authenticated');
    }
  }

  copyPayrollId(payrollId: string) {
    navigator.clipboard.writeText(payrollId).then(() => {
      alert('Payroll ID copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy payroll ID:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = payrollId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Payroll ID copied to clipboard!');
    });
  }

  // Payroll Modal Methods
  openPayrollModal() {
    this.showPayrollModal = true;
  }

  closePayrollModal() {
    this.showPayrollModal = false;
  }
  

  // Punch In/Out Methods
  punchIn() {
    if (this.canPunchIn) {
      const currentTime = new Date().toLocaleTimeString();
      alert(`Punched In at ${currentTime}`);
      this.canPunchIn = false;
      this.canPunchOut = true;
      this.totalHoursWorked += 8; // Simulate 8 hours work
    }
  }

  punchOut() {
    if (this.canPunchOut) {
      const currentTime = new Date().toLocaleTimeString();
      alert(`Punched Out at ${currentTime}`);
      this.canPunchIn = true;
      this.canPunchOut = false;
    }
  }

  generatePayslipContent(payroll: Payroll): string {
    return `
PAYSLIP - ${payroll.payPeriod}
=====================================

Employee Details:
Name: ${payroll.employeeName}
Employee ID: ${payroll.employeeId}
Pay Period: ${payroll.payPeriod}

Earnings:
Basic Salary: ₹${payroll.basicSalary}
Allowances: ₹${payroll.allowances}
Overtime: ₹${payroll.overtime}
Bonus: ₹${payroll.bonus}
Total Earnings: ₹${payroll.totalEarnings}

Deductions:
Tax Deduction: ₹${payroll.taxDeduction}
Insurance: ₹${payroll.insuranceDeduction}
Loan Deduction: ₹${payroll.loanDeduction}
Other Deductions: ₹${payroll.otherDeductions}
Total Deductions: ₹${payroll.totalDeductions}

Net Salary: ₹${payroll.netSalary}

Payment Details:
Status: ${payroll.status}
Payment Method: ${payroll.paymentMethod}
Processed Date: ${payroll.processedDate}
Processed By: ${payroll.processedBy}

Notes: ${payroll.notes || 'N/A'}
    `.trim();
  }

  // Leave Request Methods
  openLeaveRequestModal() {
    this.showLeaveModal = true;
    this.resetLeaveRequest();
  }

  closeLeaveRequestModal() {
    this.showLeaveModal = false;
    this.resetLeaveRequest();
  }

  resetLeaveRequest() {
    this.leaveRequest = {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    };
  }

  submitLeaveRequest() {
    if (!this.currentUser?.id) {
      alert('❌ User not logged in');
      return;
    }

    if (!this.leaveRequest.leaveType || !this.leaveRequest.startDate || 
        !this.leaveRequest.endDate || !this.leaveRequest.reason) {
      alert('❌ Please fill in all required fields');
      return;
    }

    this.isSubmittingLeave = true;
    
    const requestData = {
      employeeId: this.currentUser.id,
      leaveType: this.leaveRequest.leaveType,
      startDate: this.leaveRequest.startDate,
      endDate: this.leaveRequest.endDate,
      reason: this.leaveRequest.reason
    };

    console.log('🚀 Submitting leave request:', requestData);

    this.leaveRequestService.createLeaveRequest(requestData).subscribe({
      next: (response) => {
        console.log('✅ Leave request submitted:', response);
        alert(`✅ Leave request submitted successfully!\nRequest ID: ${response.id}\nStatus: ${response.status}`);
        this.closeLeaveRequestModal();
        this.loadLeaveRequests(this.currentUser.id);
        this.loadSimplifiedData(); // Refresh dashboard data
        this.isSubmittingLeave = false;
      },
      error: (error) => {
        console.error('Error submitting leave request:', error);
        alert('❌ Error submitting leave request: ' + (error.error?.error || error.message));
        this.isSubmittingLeave = false;
      }
    });
  }

  // Advance Request Methods
  openAdvanceRequestModal() {
    this.showAdvanceModal = true;
    this.resetAdvanceRequest();
  }

  closeAdvanceRequestModal() {
    this.showAdvanceModal = false;
    this.resetAdvanceRequest();
  }

  resetAdvanceRequest() {
    this.advanceRequest = {
      requestAmount: 0,
      reason: '',
      repaymentPlan: ''
    };
  }

  submitAdvanceRequest() {
    if (!this.currentUser?.id) {
      alert('❌ User not logged in');
      return;
    }

    if (!this.advanceRequest.requestAmount || !this.advanceRequest.reason) {
      alert('❌ Please fill in all required fields');
      return;
    }

    this.isSubmittingAdvance = true;
    
    const requestData = {
      employeeId: this.currentUser.id,
      requestAmount: this.advanceRequest.requestAmount,
      reason: this.advanceRequest.reason,
      repaymentPlan: this.advanceRequest.repaymentPlan
    };

    console.log('🚀 Submitting advance request:', requestData);

    this.advanceRequestService.createAdvanceRequest(requestData).subscribe({
      next: (response) => {
        console.log('✅ Advance request submitted:', response);
        alert(`✅ Advance request submitted successfully!\nRequest ID: ${response.id}\nAmount: ₹${response.requestAmount}\nStatus: ${response.status}`);
        this.closeAdvanceRequestModal();
        this.loadAdvanceRequests(this.currentUser.id);
        this.loadSimplifiedData(); // Refresh dashboard data
        this.isSubmittingAdvance = false;
      },
      error: (error) => {
        console.error('Error submitting advance request:', error);
        alert('❌ Error submitting advance request: ' + (error.error?.error || error.message));
        this.isSubmittingAdvance = false;
      }
    });
  }

  // Logout method
  logout() {
    this.authService.logout();
    this.location.back();
  }

  goBack() {
    this.location.back();
  }


  // Loans & Advances Methods
  requestAdvance() {
    this.openAdvanceRequestModal();
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

  requestLeave() {
    this.openLeaveRequestModal();
  }

  private getRandomJoinDate(): string {
    // Generate random join dates between 2018 and 2024
    const startYear = 2018;
    const endYear = 2024;
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid month-end issues
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private getCurrentMonth(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2022, 2023, 2024, 2025];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = years[Math.floor(Math.random() * years.length)];
    return `${randomMonth} ${randomYear}`;
  }

  private getNextPayDate(): string {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1; // 1-30 days from now
    const nextDate = new Date(currentDate.getTime() + (randomDays * 24 * 60 * 60 * 1000));
    return nextDate.toISOString().split('T')[0];
  }

  // Tooltip methods
  getLeavesTooltip(): string {
    return `Leave Summary:\nTotal: ${this.totalLeaves} days\nUsed: ${this.usedLeaves} days\nRemaining: ${this.remainingLeaves} days\nThis Month: ${this.totalLeavesTaken} days`;
  }

  getLoansTooltip(): string {
    return `Loan Summary:\nActive Loans: ${this.activeLoansCount}\nTotal Amount: ₹${this.activeLoanAmount.toLocaleString()}\nOutstanding: ₹${this.outstandingAmount.toLocaleString()}\nTotal Requests: ${this.advanceRequests.length}`;
  }
}
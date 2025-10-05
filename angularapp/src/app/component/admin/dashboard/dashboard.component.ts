import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  role: string;
  password?: string;
}

interface Payroll {
  id: number;
  employeeId: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
  status: string;
  payrollId?: string;
  employeeName?: string;
}

interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  present: boolean;
  hoursWorked: number;
}

interface LeaveRequest {
  id: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  submittedAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  payrolls: Payroll[] = [];
  attendance: Attendance[] = [];
  leaveRequests: LeaveRequest[] = [];
  
  // Statistics
  totalUsers = 0;
  activeUsers = 0;
  totalPayroll = 0;
  averageSalary = 0;
  attendanceRate = 0;
  pendingLeaveRequests = 0;
  
  // Current user
  currentUser: any = null;
  
  // Loading states
  isLoading = true;
  selectedTab = 'overview';
  
  // Pagination for users
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;
  paginatedUsers: User[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadAllData();
  }

  private loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private loadAllData() {
    this.isLoading = true;
    
    // Try to load from backend first
    this.loadFromBackend();
    
    // Fallback to localStorage if backend fails
    setTimeout(() => {
      if (this.users.length === 0) {
        this.loadFromLocalStorage();
      }
      this.isLoading = false;
    }, 2000);
  }

  private loadFromBackend() {
    console.log('🔄 Loading data from backend...');
    
    // Load users directly from the correct endpoint
    this.http.get<any[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          console.log('✅ Loaded users:', users.length);
          // Filter out admin users and use users directly
          const employeeUsers = users.filter(user => user.role !== 'ADMIN');
          this.users = employeeUsers.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName || '',
            email: user.email,
            phoneNumber: user.phoneNumber || '',
            role: user.role,
            password: user.password
          }));
          this.calculateStatistics();
        },
        error: (error) => {
          console.log('❌ Users backend not available:', error);
        }
      });

    // Load real payroll data from database
    this.http.get<any[]>(`${environment.apiUrl}/payroll/all`)
      .subscribe({
        next: (payrolls) => {
          console.log('✅ Loaded payrolls:', payrolls.length);
          this.payrolls = payrolls.map(payroll => ({
            id: payroll.id,
            employeeId: payroll.employeeId,
            basicSalary: payroll.basicSalary || 0,
            allowances: payroll.allowances || 0,
            deductions: payroll.totalDeductions || 0,
            netSalary: payroll.netSalary || 0,
            payPeriod: payroll.payPeriod || 'Current Period',
            status: payroll.status || 'PENDING',
            payrollId: payroll.payrollId || 'N/A',
            employeeName: payroll.employeeName || 'Unknown'
          }));
          this.calculateStatistics();
        },
        error: (error) => {
          console.log('❌ Payroll backend not available:', error);
          // Fallback to mock data if no payrolls exist
          this.generateMockPayrollData();
        }
      });

    // Load real attendance data (if available)
    this.http.get<any[]>(`${environment.apiUrl}/attendance/all`)
      .subscribe({
        next: (attendanceRecords) => {
          console.log('✅ Loaded attendance:', attendanceRecords.length);
          this.attendance = attendanceRecords.map(record => ({
            id: record.id,
            employeeId: record.employeeId,
            date: record.date,
            present: record.present,
            hoursWorked: record.hoursWorked || 8
          }));
          this.calculateStatistics();
        },
        error: (error) => {
          console.log('❌ Attendance backend not available:', error);
          // Generate mock attendance data
          this.generateMockAttendanceData();
        }
      });

    // Load real leave requests
    this.http.get<any[]>(`${environment.apiUrl}/leave/all`)
      .subscribe({
        next: (leaveRequests) => {
          console.log('✅ Loaded leave requests:', leaveRequests.length);
          this.leaveRequests = leaveRequests.map(request => ({
            id: request.id,
            employeeId: request.employeeId,
            leaveType: request.leaveType || 'Personal Leave',
            startDate: request.startDate,
            endDate: request.endDate,
            reason: request.reason || 'Personal reasons',
            status: request.status || 'PENDING',
            submittedAt: request.submittedAt || new Date().toISOString()
          }));
          this.calculateStatistics();
        },
        error: (error) => {
          console.log('❌ Leave requests backend not available:', error);
          // Generate mock leave requests
          this.generateMockLeaveRequests();
        }
      });
  }

  getDepartmentForRole(role: string): string {
    const departmentMap: { [key: string]: string } = {
      'ADMIN': 'Administration',
      'EMPLOYEE': 'Operations',
      'MANAGER': 'Management',
      'HR': 'Human Resources'
    };
    return departmentMap[role] || 'General';
  }

  getSalaryForRole(role: string): number {
    const salaryRanges: { [key: string]: number } = {
      'ADMIN': 80000,
      'EMPLOYEE': 50000,
      'MANAGER': 70000,
      'HR': 60000
    };
    return salaryRanges[role] || 45000;
  }

  private loadFromLocalStorage() {
    console.log('Loading data from localStorage for admin dashboard');
    
    // Load users from localStorage
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
    
    // Load leave requests from localStorage
    const leaveRequestsData = localStorage.getItem('leaveRequests');
    if (leaveRequestsData) {
      this.leaveRequests = JSON.parse(leaveRequestsData);
    }
    
    // Load advance requests from localStorage
    const advanceRequestsData = localStorage.getItem('advanceRequests');
    if (advanceRequestsData) {
      // Convert advance requests to leave requests format for display
      const advanceRequests = JSON.parse(advanceRequestsData);
      this.leaveRequests = [...this.leaveRequests, ...advanceRequests.map((req: any) => ({
        id: req.requestId,
        employeeId: req.employeeId,
        leaveType: 'Advance Request',
        startDate: req.submittedAt.split('T')[0],
        endDate: req.submittedAt.split('T')[0],
        reason: req.reason,
        status: req.status,
        submittedAt: req.submittedAt
      }))];
    }
    
    // Generate mock payroll and attendance data
    this.generateMockData();
    
    this.calculateStatistics();
  }

  private generateMockData() {
    // Generate mock payroll data
    this.payrolls = this.users.map(user => ({
      id: user.id,
      employeeId: user.id,
      basicSalary: this.getSalaryForRole(user.role),
      allowances: Math.floor(this.getSalaryForRole(user.role) * 0.2),
      deductions: Math.floor(this.getSalaryForRole(user.role) * 0.15),
      netSalary: this.getSalaryForRole(user.role) + Math.floor(this.getSalaryForRole(user.role) * 0.2) - Math.floor(this.getSalaryForRole(user.role) * 0.15),
      payPeriod: this.getRandomPayPeriod(),
      status: 'PAID'
    }));

    // Generate mock attendance data
    this.attendance = this.users.flatMap(user => {
      const attendanceRecords = [];
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomYear = 2022 + Math.floor(Math.random() * 3); // 2022-2024
      
      for (let i = 1; i <= 22; i++) {
        attendanceRecords.push({
          id: user.id * 100 + i,
          employeeId: user.id,
          date: `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`,
          present: Math.random() > 0.1, // 90% attendance rate
          hoursWorked: Math.random() > 0.1 ? 8 : 0
        });
      }
      return attendanceRecords;
    });
  }

  private generateMockPayrollData() {
    console.log('🔄 Generating mock payroll data...');
    this.payrolls = this.users.map(user => ({
      id: user.id,
      employeeId: user.id,
      basicSalary: this.getSalaryForRole(user.role),
      allowances: Math.floor(this.getSalaryForRole(user.role) * 0.2),
      deductions: Math.floor(this.getSalaryForRole(user.role) * 0.15),
      netSalary: this.getSalaryForRole(user.role) + Math.floor(this.getSalaryForRole(user.role) * 0.2) - Math.floor(this.getSalaryForRole(user.role) * 0.15),
      payPeriod: this.getRandomPayPeriod(),
      status: 'PAID',
      payrollId: `EMP${user.id}DEC001`,
      employeeName: user.firstName
    }));
    this.calculateStatistics();
  }

  private generateMockAttendanceData() {
    console.log('🔄 Generating mock attendance data...');
    this.attendance = this.users.flatMap(user => {
      const attendanceRecords = [];
      for (let i = 1; i <= 22; i++) {
        attendanceRecords.push({
          id: user.id * 100 + i,
          employeeId: user.id,
          date: `2024-12-${i.toString().padStart(2, '0')}`,
          present: Math.random() > 0.1, // 90% attendance rate
          hoursWorked: Math.random() > 0.1 ? 8 : 0
        });
      }
      return attendanceRecords;
    });
    this.calculateStatistics();
  }

  private generateMockLeaveRequests() {
    console.log('🔄 Generating mock leave requests...');
    this.leaveRequests = this.users.slice(0, 3).map(user => ({
      id: user.id,
      employeeId: user.id,
      leaveType: ['Sick Leave', 'Personal Leave', 'Vacation'][Math.floor(Math.random() * 3)],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      reason: 'Personal reasons',
      status: ['PENDING', 'APPROVED', 'REJECTED'][Math.floor(Math.random() * 3)],
      submittedAt: new Date().toISOString()
    }));
    this.calculateStatistics();
  }

  private calculateStatistics() {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(user => user.role === 'EMPLOYEE' || user.role === 'ADMIN').length;
    
    this.totalPayroll = this.payrolls.reduce((sum, payroll) => sum + payroll.netSalary, 0);
    this.averageSalary = this.totalUsers > 0 ? this.totalPayroll / this.totalUsers : 0;
    
    const totalAttendanceRecords = this.attendance.length;
    const presentRecords = this.attendance.filter(att => att.present).length;
    this.attendanceRate = totalAttendanceRecords > 0 ? (presentRecords / totalAttendanceRecords) * 100 : 0;
    
    this.pendingLeaveRequests = this.leaveRequests.filter(req => req.status === 'PENDING').length;
    
    // Calculate pagination
    this.calculatePagination();
  }

  private calculatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  }

  private updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  // Pagination methods
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // Helper method for template
  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getEmployeeName(employeeId: number): string {
    const user = this.users.find(u => u.id === employeeId);
    if (user) {
      return user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName;
    }
    return 'Unknown User';
  }

  getEmployeeEmail(employeeId: number): string {
    const user = this.users.find(u => u.id === employeeId);
    return user ? user.email : 'Unknown Email';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN');
  }

  generateSamplePayrolls() {
    console.log('🔄 Generating sample payrolls...');
    this.generateMockPayrollData();
  }


  getPendingPayrollsCount(): number {
    return this.payrolls.filter(p => p.status === 'PENDING').length;
  }

  getPaidPayrollsCount(): number {
    return this.payrolls.filter(p => p.status === 'PAID').length;
  }

  getTotalPayrollAmount(): number {
    return this.payrolls.reduce((sum, p) => sum + p.netSalary, 0);
  }

  private getRandomPayPeriod(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2022, 2023, 2024, 2025];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = years[Math.floor(Math.random() * years.length)];
    return `${randomMonth} ${randomYear}`;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'paid': return 'status-paid';
      default: return 'status-default';
    }
  }

  approveRequest(request: LeaveRequest) {
    console.log('Approving request:', request);
    
    // Make API call to update the backend
    const updateData = {
      status: 'APPROVED',
      notes: 'Approved by admin'
    };
    
    this.http.put(`${environment.apiUrl}/admin/leave-request/${request.id}/status`, updateData)
      .subscribe({
        next: (response) => {
          console.log('✅ Leave request approved:', response);
          
          // Update the request status locally
          const index = this.leaveRequests.findIndex(r => r.id === request.id);
          if (index !== -1) {
            this.leaveRequests[index].status = 'APPROVED';
          }
          
          alert(`Leave request for ${this.getEmployeeName(request.employeeId)} has been approved!`);
          
          // Refresh the data
          this.calculateStatistics();
        },
        error: (error) => {
          console.error('❌ Error approving leave request:', error);
          alert('Error approving leave request. Please try again.');
        }
      });
  }

  rejectRequest(request: LeaveRequest) {
    console.log('Rejecting request:', request);
    
    // Make API call to update the backend
    const updateData = {
      status: 'REJECTED',
      notes: 'Rejected by admin'
    };
    
    this.http.put(`${environment.apiUrl}/admin/leave-request/${request.id}/status`, updateData)
      .subscribe({
        next: (response) => {
          console.log('✅ Leave request rejected:', response);
          
          // Update the request status locally
          const index = this.leaveRequests.findIndex(r => r.id === request.id);
          if (index !== -1) {
            this.leaveRequests[index].status = 'REJECTED';
          }
          
          alert(`Leave request for ${this.getEmployeeName(request.employeeId)} has been rejected!`);
          
          // Refresh the data
          this.calculateStatistics();
        },
        error: (error) => {
          console.error('❌ Error rejecting leave request:', error);
          alert('Error rejecting leave request. Please try again.');
        }
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: string;
  appliedDate: string;
  approvedBy: string;
  approvedDate: string;
  rejectionReason: string;
  notes: string;
}

export interface AdvanceRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  requestAmount: number;
  reason: string;
  repaymentPlan: string;
  status: string;
  requestedDate: string;
  approvedBy: string;
  approvedDate: string;
  rejectionReason: string;
  approvedAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  installmentAmount: number;
  remainingAmount: number;
  notes: string;
}

export interface Payroll {
  id: number;
  employeeId: number;
  employeeName: string;
  payPeriod: string;
  payDate: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  bonus: number;
  totalEarnings: number;
  taxDeduction: number;
  insuranceDeduction: number;
  pfDeduction: number;
  esiDeduction: number;
  professionalTaxDeduction: number;
  loanDeduction: number;
  otherDeductions: number;
  attendanceDeduction: number;
  leaveDeduction: number;
  totalDeductions: number;
  netSalary: number;
  status: string;
  processedBy: string;
  processedDate: string;
  paymentMethod: string;
  notes: string;
  payrollId: string;
}

export interface EmployeeActivity {
  type: 'Leave Request' | 'Advance Request' | 'Payroll Processed';
  employeeId: number;
  employeeName: string;
  details: LeaveRequest | AdvanceRequest | Payroll;
  date: string;
  status: string;
}

export interface PendingRequests {
  pendingLeaves: LeaveRequest[];
  pendingAdvances: AdvanceRequest[];
}

export interface RecentActivities {
  activities: EmployeeActivity[];
}

export interface AllActivities {
  activities: EmployeeActivity[];
}

export interface DashboardSummary {
  totalEmployees: number;
  pendingRequests: number;
  approvedThisMonth: number;
  recentActivitiesCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getAllEmployeeActivities(): Observable<EmployeeActivity[]> {
    return this.http.get<EmployeeActivity[]>(`${this.apiUrl}/employee-activities`);
  }

  getEmployeeActivities(employeeId: number): Observable<EmployeeActivity[]> {
    return this.http.get<EmployeeActivity[]>(`${this.apiUrl}/employee-activities/${employeeId}`);
  }

  getPendingRequests(): Observable<EmployeeActivity[]> {
    return this.http.get<EmployeeActivity[]>(`${this.apiUrl}/pending-requests`);
  }

  getRecentActivities(): Observable<EmployeeActivity[]> {
    return this.http.get<EmployeeActivity[]>(`${this.apiUrl}/recent-activities`);
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/dashboard-summary`);
  }

  updateLeaveRequestStatus(requestId: number, status: string, rejectionReason?: string): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/leave-request/${requestId}/status`, { status, rejectionReason });
  }

  updateAdvanceRequestStatus(requestId: number, status: string, approvedAmount?: number, rejectionReason?: string): Observable<AdvanceRequest> {
    return this.http.put<AdvanceRequest>(`${this.apiUrl}/advance-request/${requestId}/status`, { status, approvedAmount, rejectionReason });
  }

  getAllPendingRequests(): Observable<PendingRequests> {
    return this.http.get<PendingRequests>(`${this.apiUrl}/pending-requests`);
  }

  getAllRecentActivities(): Observable<RecentActivities> {
    return this.http.get<RecentActivities>(`${this.apiUrl}/recent-activities`);
  }

  getAllActivities(): Observable<AllActivities> {
    return this.http.get<AllActivities>(`${this.apiUrl}/employee-activities`);
  }
}
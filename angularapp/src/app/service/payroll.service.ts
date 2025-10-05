import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Payroll {
  id: number;
  payrollId: string;
  employeeId: number;
  employeeName: string;
  payPeriod: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  bonus: number;
  totalEarnings: number;
  taxDeduction: number;
  insuranceDeduction: number;
  loanDeduction: number;
  otherDeductions: number;
  attendanceDeduction: number;
  leaveDeduction: number;
  totalDeductions: number;
  netSalary: number;
  payDate: string;
  status: string;
  paymentMethod: string;
  processedDate: string;
  processedBy: string;
  notes: string;
}

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
  status: string;
  requestedDate: string;
  approvedAmount: number;
  approvedBy: string;
  approvedDate: string;
  rejectionReason: string;
  repaymentPlan: string;
  installmentAmount: number;
  totalInstallments: number;
  paidInstallments: number;
  remainingAmount: number;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseUrl = `${environment.apiUrl}/payroll`;

  constructor(private http: HttpClient) {}

  getPayrollsByEmployee(employeeId: number): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  getCurrentPayroll(employeeId: number): Observable<Payroll> {
    return this.http.get<Payroll>(`${this.baseUrl}/employee/${employeeId}/current`);
  }

  createPayroll(employeeId: number): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.baseUrl}/employee/${employeeId}/create`, {});
  }

  updatePayrollStatus(payrollId: number, status: string): Observable<Payroll> {
    return this.http.put<Payroll>(`${this.baseUrl}/${payrollId}/status`, { status });
  }

  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}/all`);
  }

  getPayrollsByStatus(status: string): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}/status/${status}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseUrl = `${environment.apiUrl}/leave`;

  constructor(private http: HttpClient) {}

  getLeaveRequestsByEmployee(employeeId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  createLeaveRequest(leaveRequest: Partial<LeaveRequest>): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.baseUrl}/request`, leaveRequest);
  }

  updateLeaveRequestStatus(leaveRequestId: number, status: string, approvedBy?: string, rejectionReason?: string): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.baseUrl}/${leaveRequestId}/status`, {
      status,
      approvedBy,
      rejectionReason
    });
  }

  getPendingLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/pending`);
  }

  getLeaveRequestsByStatus(status: string): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/status/${status}`);
  }

  deleteLeaveRequest(leaveRequestId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${leaveRequestId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdvanceRequestService {
  private baseUrl = `${environment.apiUrl}/advance`;

  constructor(private http: HttpClient) {}

  getAdvanceRequestsByEmployee(employeeId: number): Observable<AdvanceRequest[]> {
    return this.http.get<AdvanceRequest[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  createAdvanceRequest(advanceRequest: Partial<AdvanceRequest>): Observable<AdvanceRequest> {
    return this.http.post<AdvanceRequest>(`${this.baseUrl}/request`, advanceRequest);
  }

  updateAdvanceRequestStatus(advanceRequestId: number, status: string, approvedBy?: string, 
                           approvedAmount?: number, repaymentPlan?: string, 
                           totalInstallments?: number, rejectionReason?: string): Observable<AdvanceRequest> {
    return this.http.put<AdvanceRequest>(`${this.baseUrl}/${advanceRequestId}/status`, {
      status,
      approvedBy,
      approvedAmount,
      repaymentPlan,
      totalInstallments,
      rejectionReason
    });
  }

  processInstallmentPayment(advanceRequestId: number): Observable<AdvanceRequest> {
    return this.http.put<AdvanceRequest>(`${this.baseUrl}/${advanceRequestId}/installment`, {});
  }

  getPendingAdvanceRequests(): Observable<AdvanceRequest[]> {
    return this.http.get<AdvanceRequest[]>(`${this.baseUrl}/pending`);
  }

  getOutstandingAmount(employeeId: number): Observable<{employeeId: number, outstandingAmount: number}> {
    return this.http.get<{employeeId: number, outstandingAmount: number}>(`${this.baseUrl}/employee/${employeeId}/outstanding`);
  }

  getAdvanceRequestsByStatus(status: string): Observable<AdvanceRequest[]> {
    return this.http.get<AdvanceRequest[]>(`${this.baseUrl}/status/${status}`);
  }

  deleteAdvanceRequest(advanceRequestId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${advanceRequestId}`);
  }
}

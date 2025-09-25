import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Payroll {
  id?: number;
  payDate: string;       // Use ISO string for dates
  basicSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  employeeId: number;    // Link to employee
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseUrl = '/api/payrolls';

  constructor(private http: HttpClient) { }

  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(this.baseUrl);
  }

  getPayrollById(id: number): Observable<Payroll> {
    return this.http.get<Payroll>(`${this.baseUrl}/${id}`);
  }

  createPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(this.baseUrl, payroll);
  }

  updatePayroll(id: number, payroll: Payroll): Observable<Payroll> {
    return this.http.put<Payroll>(`${this.baseUrl}/${id}`, payroll);
  }

  deletePayroll(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Deduction {
  id?: number;
  employee: string;       // Employee name for display
  month: string;          // e.g., "Sep 2025"
  tax: number;
  pf: number;
  other: number;
  totalDeduction: number;
  payrollId?: number;     // Link to payroll
}


@Injectable({
  providedIn: 'root'
})
export class DeductionService {
  private baseUrl = '/api/deductions';

  constructor(private http: HttpClient) { }

  getAllDeductions(): Observable<Deduction[]> {
    return this.http.get<Deduction[]>(this.baseUrl);
  }

  getDeductionById(id: number): Observable<Deduction> {
    return this.http.get<Deduction>(`${this.baseUrl}/${id}`);
  }

  createDeduction(ded: Deduction): Observable<Deduction> {
    return this.http.post<Deduction>(this.baseUrl, ded);
  }

  updateDeduction(id: number, ded: Deduction): Observable<Deduction> {
    return this.http.put<Deduction>(`${this.baseUrl}/${id}`, ded);
  }

  deleteDeduction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getDeductionSummary(): Observable<Deduction[]> {
    return this.http.get<Deduction[]>(`${this.baseUrl}/summary`);
  }

  linkDeductionToPayroll(deductionId: number, payrollId: number): Observable<Deduction> {
    return this.http.put<Deduction>(`${this.baseUrl}/${deductionId}/link-payrolls/${payrollId}`, {});
  }
}

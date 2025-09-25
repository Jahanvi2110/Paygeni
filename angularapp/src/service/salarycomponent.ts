import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface SalaryComponent {
  id?: number;
  componentName: string;  // e.g., HRA, Bonus
  amount: number;
  payrollId: number;      // Link to payroll
}

@Injectable({
  providedIn: 'root'
})
export class SalaryComponentService {
  private baseUrl = '/api/salary-components';

  constructor(private http: HttpClient) { }

  getAllComponents(): Observable<SalaryComponent[]> {
    return this.http.get<SalaryComponent[]>(this.baseUrl);
  }

  getComponentById(id: number): Observable<SalaryComponent> {
    return this.http.get<SalaryComponent>(`${this.baseUrl}/${id}`);
  }

  createComponent(comp: SalaryComponent): Observable<SalaryComponent> {
    return this.http.post<SalaryComponent>(this.baseUrl, comp);
  }

  updateComponent(id: number, comp: SalaryComponent): Observable<SalaryComponent> {
    return this.http.put<SalaryComponent>(`${this.baseUrl}/${id}`, comp);
  }

  deleteComponent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

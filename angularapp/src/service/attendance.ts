import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface AttendanceRecord {
  id?: number;
  employee: string;      // Employee name
  month: string;         // e.g., "Sep 2025"
  presentDays: number;
  absentDays: number;
  leaveDays: number;
}


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = '/api/attendance';

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.baseUrl);
  }

  getRecordById(id: number): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(`${this.baseUrl}/${id}`);
  }

  createRecord(record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(this.baseUrl, record);
  }

  updateRecord(id: number, record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.baseUrl}/${id}`, record);
  }

  deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

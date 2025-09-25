export interface AttendanceRecord {
  id?: number;
  employee: string;      // Employee name
  month: string;         // e.g., "Sep 2025"
  presentDays: number;
  absentDays: number;
  leaveDays: number;
}

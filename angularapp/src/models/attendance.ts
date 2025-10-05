export interface AttendanceRecord {
  id?: number;
  employeeId: string;
  employeeName: string;
  employeePhoto?: string;
  department?: string;
  month: string; // e.g., "Sep 2025"
  year?: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  totalWorkingDays?: number;
  attendancePercentage?: number;
  lateArrivals?: number;
  earlyDepartures?: number;
  lastAttendanceDate?: string;
  createdAt?: string; // ISO date string
  notes?: string;
  
  // Additional field to match backend Spring Boot model
  present?: number; // Additional field for database compatibility (matches Spring Boot)
}

export interface Payroll {
  id?: number;
  payDate: string; // Use ISO string for dates
  basicSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  employeeId: number; // Link to employee
  employeeName?: string;
  department?: string;
  payPeriod?: string; // e.g., "Sep 2025"
  status?: string; // PENDING, PROCESSED, PAID
  paymentMethod?: string; // BANK_TRANSFER, CHECK, CASH
  processedDate?: string; // ISO date string
  processedBy?: string;
  notes?: string;
}

export interface Deduction {
  id?: number;
  employeeId: string;
  employeeName: string;
  employeePhoto?: string;
  department?: string;
  month: string; // e.g., "Sep 2025"
  year?: number;
  tax: number;
  pf: number;
  other: number;
  totalDeduction: number;
  deductionType?: string; // TAX, PF, INSURANCE, OTHER
  status?: string; // PENDING, APPROVED, REJECTED
  description?: string;
  createdAt?: string; // ISO date string
  approvedBy?: string;
  notes?: string;
  payrollId?: number; // Link to payroll
}

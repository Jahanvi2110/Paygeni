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

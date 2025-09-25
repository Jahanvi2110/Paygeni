export interface Payroll {
  id?: number;
  payDate: string;       // Use ISO string for dates
  basicSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  employeeId: number;    // Link to employee
}

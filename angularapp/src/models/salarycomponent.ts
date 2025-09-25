export interface SalaryComponent {
  id?: number;
  componentName: string;  // e.g., HRA, Bonus
  amount: number;
  payrollId: number;      // Link to payroll
}

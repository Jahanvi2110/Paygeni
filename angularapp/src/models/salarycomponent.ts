export interface SalaryComponent {
  id?: number;
  componentName: string; // e.g., HRA, Bonus
  amount: number;
  payrollId: number; // Link to payroll
  componentType?: string; // EARNING, DEDUCTION
  description?: string;
  isTaxable?: boolean; // true for taxable components
  status?: string; // ACTIVE, INACTIVE
}

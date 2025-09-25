import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

interface Payroll {
  id: number;
  employee: string;
  month: string;
  basic: number;
  allowance: number;
  deductions: number;
  netSalary: number;
}

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  payrolls: Payroll[] = [
    { id: 1, employee: 'Alice Johnson', month: 'August 2025', basic: 50000, allowance: 8000, deductions: 2000, netSalary: 56000 },
    { id: 2, employee: 'Bob Smith', month: 'August 2025', basic: 45000, allowance: 7000, deductions: 3000, netSalary: 49000 },
    { id: 3, employee: 'Charlie Brown', month: 'August 2025', basic: 40000, allowance: 6000, deductions: 2500, netSalary: 43500 },
    { id: 4, employee: 'Diana Prince', month: 'August 2025', basic: 55000, allowance: 9000, deductions: 3500, netSalary: 60500 },
    { id: 5, employee: 'Eve Wilson', month: 'August 2025', basic: 48000, allowance: 7500, deductions: 2800, netSalary: 52700 }
  ];

  constructor(private location: Location) {}

  downloadSlip(payroll: Payroll) {
    alert(`📄 Downloading salary slip for ${payroll.employee} (${payroll.month})\n\nNet Salary: ₹${payroll.netSalary.toLocaleString()}`);
  }

  viewPayroll(payroll: Payroll) {
    alert(`👁️ Payroll Details for ${payroll.employee}\n\n` +
          `Month: ${payroll.month}\n` +
          `Basic Salary: ₹${payroll.basic.toLocaleString()}\n` +
          `Allowance: ₹${payroll.allowance.toLocaleString()}\n` +
          `Deductions: ₹${payroll.deductions.toLocaleString()}\n` +
          `Net Salary: ₹${payroll.netSalary.toLocaleString()}`);
  }

  generatePayroll() {
    alert('🔄 Generating new payroll for current month...\n\nThis will calculate salaries for all active employees.');
  }

  exportPayroll() {
    alert('📊 Exporting payroll data to Excel...\n\nAll payroll records will be exported.');
  }

  logout() {
    alert('👋 Logging out...');
  }

  goBack() {
    this.location.back();
  }

  // Statistics methods
  getTotalNetSalary(): number {
    return this.payrolls.reduce((total, payroll) => total + payroll.netSalary, 0);
  }

  getAverageSalary(): number {
    return this.getTotalNetSalary() / this.payrolls.length;
  }

  getUniqueEmployees(): number {
    return new Set(this.payrolls.map(p => p.employee)).size;
  }

  // Track by function for better performance
  trackByPayrollId(index: number, payroll: Payroll): number {
    return payroll.id;
  }
}

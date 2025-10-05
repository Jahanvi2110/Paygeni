import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Payroll {
  id: number;
  employee: string;
  month: string;
  basic: number;
  allowance: number;
  deductions: number;
  netSalary: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  payrolls: Payroll[] = [];
  isLoading = true;
  users: User[] = [];

  constructor(
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.isLoading = true;
    console.log('🔄 Loading users from:', `${environment.apiUrl}/auth/users`);
    
    this.http.get<User[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          console.log('✅ Users loaded successfully:', users);
          this.users = users;
          this.generatePayrollData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading users:', error);
          this.isLoading = false;
        }
      });
  }

  private generatePayrollData() {
    // Generate payroll data based on actual users
    this.payrolls = this.users.map((user, index) => {
      const basicSalary = this.getSalaryForRole(user.role);
      const allowance = Math.round(basicSalary * 0.15); // 15% allowance
      const deductions = Math.round(basicSalary * 0.12); // 12% deductions
      const netSalary = basicSalary + allowance - deductions;

      return {
        id: user.id,
        employee: user.firstName + (user.lastName ? ' ' + user.lastName : ''),
        month: this.getRandomMonth(),
        basic: basicSalary,
        allowance: allowance,
        deductions: deductions,
        netSalary: netSalary
      };
    });
  }

  private getSalaryForRole(role: string): number {
    const salaryRanges: { [key: string]: number } = {
      'ADMIN': 80000,
      'EMPLOYEE': 50000,
      'MANAGER': 70000,
      'HR': 60000
    };
    return salaryRanges[role] || 45000;
  }

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
    this.loadUsers(); // Refresh the data
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

  private getRandomMonth(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2022, 2023, 2024, 2025];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = years[Math.floor(Math.random() * years.length)];
    return `${randomMonth} ${randomYear}`;
  }
}

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
  email?: string;
  phone?: string;
  department?: string;
}

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
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
  selectedPayroll: Payroll | null = null;
  showPayrollModal = false;

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
    this.payrolls = this.users.map(user => {
      const basicSalary = this.getSalaryForRole(user.role);
      const allowance = Math.round(basicSalary * 0.15);
      const deductions = Math.round(basicSalary * 0.12);
      const netSalary = basicSalary + allowance - deductions;

      return {
        id: user.id,
        employee: user.firstName + (user.lastName ? ' ' + user.lastName : ''),
        month: this.getCurrentMonth(),
        basic: basicSalary,
        allowance,
        deductions,
        netSalary,
        email: user.email,
        phone: user.phoneNumber,
        department: this.getDepartmentForRole(user.role)
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

  private getDepartmentForRole(role: string): string {
    const departments: { [key: string]: string } = {
      'ADMIN': 'Administration',
      'EMPLOYEE': 'Operations',
      'MANAGER': 'Management',
      'HR': 'Human Resources'
    };
    return departments[role] || 'General';
  }

  private getCurrentMonth(): string {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  // ------------------- Payslip Download -------------------
  downloadSlip(payroll: Payroll) {
    console.log('📄 Downloading salary slip for:', payroll.employee);

    const payslipContent = this.generatePayslipContent(payroll);

    const blob = new Blob([payslipContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payslip_${payroll.employee.replace(/\s+/g, '_')}_${payroll.month.replace(/\s+/g, '_')}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);

    alert(`✅ Payslip for ${payroll.month} downloaded successfully!\n\nEmployee: ${payroll.employee}\nNet Salary: ₹${payroll.netSalary.toLocaleString()}`);
  }

  private generatePayslipContent(payroll: Payroll): string {
    const currentDate = new Date().toLocaleDateString('en-IN');

    return `
============================ PAYGENI CORPORATION ============================

                         SALARY SLIP - ${payroll.month}

Employee Name : ${payroll.employee}
Employee ID   : EMP${payroll.id.toString().padStart(4, '0')}
Email         : ${payroll.email || 'N/A'}
Phone         : ${payroll.phone || 'N/A'}
Department    : ${payroll.department || 'N/A'}
Generated On  : ${currentDate}

--------------------------------- SALARY DETAILS ---------------------------------

Basic Salary  : ₹${payroll.basic.toLocaleString()}
Allowance     : ₹${payroll.allowance.toLocaleString()}
Gross Salary  : ₹${(payroll.basic + payroll.allowance).toLocaleString()}
Deductions    : -₹${payroll.deductions.toLocaleString()}
Net Salary    : ₹${payroll.netSalary.toLocaleString()}

-------------------------------------------------------------------------------

This is a computer-generated salary slip and does not require a signature.
For any queries, please contact the HR Department.

===============================================================================
`;
  }

  // ------------------- Payroll Modal -------------------
  viewPayroll(payroll: Payroll) {
    console.log('👁️ Viewing payroll details for:', payroll.employee);
    this.selectedPayroll = payroll;
    this.showPayrollModal = true;
  }

  closePayrollModal() {
    this.showPayrollModal = false;
    this.selectedPayroll = null;
  }

  // ------------------- Payroll Generation & Export -------------------
  generatePayroll() {
    console.log('🔄 Generating new payroll for current month...');
    alert('🔄 Generating new payroll for current month...\n\nThis will calculate salaries for all active employees.');
    this.loadUsers();
  }

  exportPayroll() {
    console.log('📊 Exporting payroll data to Excel...');
    
    const csvContent = this.generateCSVContent();
    this.downloadCSV(csvContent, `Payroll_Export_${this.getCurrentMonth().replace(/\s+/g, '_')}.csv`);

    alert('✅ Payroll data exported successfully!\n\nAll payroll records have been exported to CSV format.');
  }

  private generateCSVContent(): string {
    const headers = ['Employee ID', 'Employee Name', 'Email', 'Phone', 'Department', 'Month', 'Basic Salary', 'Allowance', 'Deductions', 'Net Salary'];
    const csvRows = [headers.join(',')];

    this.payrolls.forEach(payroll => {
      const row = [
        `EMP${payroll.id.toString().padStart(4, '0')}`,
        `"${payroll.employee}"`,
        payroll.email || 'N/A',
        payroll.phone || 'N/A',
        payroll.department || 'N/A',
        `"${payroll.month}"`,
        payroll.basic,
        payroll.allowance,
        payroll.deductions,
        payroll.netSalary
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // ------------------- Utility Methods -------------------
  logout() {
    console.log('👋 Logging out...');
    alert('👋 Logging out...');
  }

  goBack() {
    this.location.back();
  }

  getTotalNetSalary(): number {
    return this.payrolls.reduce((total, payroll) => total + payroll.netSalary, 0);
  }

  getAverageSalary(): number {
    return this.payrolls.length > 0 ? Math.round(this.getTotalNetSalary() / this.payrolls.length) : 0;
  }

  getUniqueEmployees(): number {
    return new Set(this.payrolls.map(p => p.employee)).size;
  }

  trackByPayrollId(index: number, payroll: Payroll): number {
    return payroll.id;
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-IN');
  }
}

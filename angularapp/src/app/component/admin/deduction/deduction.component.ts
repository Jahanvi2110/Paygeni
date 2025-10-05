import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Deduction {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePhoto: string;
  department: string;
  month: string;
  year: number;
  tax: number;
  pf: number;
  esi: number;
  professionalTax: number;
  loanDeduction: number;
  advanceDeduction: number;
  other: number;
  totalDeduction: number;
  grossSalary: number;
  netSalary: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  approvedBy?: string;
  notes?: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-deduction',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {
  currentUser: any = null;
  isLoading = true;
  users: User[] = [];
  
  // Search and filter properties
  searchTerm = '';
  selectedMonth = 'All';
  selectedYear = 'All';
  selectedStatus = 'All';
  selectedDepartment = 'All';
  sortBy = 'employeeName';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  // Modal properties
  selectedDeduction: any = null;
  
  // Filter options
  months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['All', '2022', '2023', '2024', '2025'];
  statuses = ['All', 'Pending', 'Approved', 'Rejected'];
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  deductions: Deduction[] = [];

  constructor(
    private authService: AuthService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Get current user information (if logged in)
    this.currentUser = this.authService.getCurrentUser();
    
    // If no user is logged in, set a default admin user for demo purposes
    if (!this.currentUser) {
      this.currentUser = {
        name: 'Demo Admin',
        email: 'demo@admin.com',
        role: 'admin',
        id: 'DEMO001'
      };
    }
    
    this.loadUsers();
  }

  private loadUsers() {
    this.isLoading = true;
    console.log('🔄 Loading users for deductions from:', `${environment.apiUrl}/auth/users`);
    
    this.http.get<User[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          console.log('✅ Users loaded for deductions:', users);
          this.users = users;
          this.generateDeductionData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading users for deductions:', error);
          this.isLoading = false;
        }
      });
  }

  private generateDeductionData() {
    // Generate deduction data based on actual users
    this.deductions = this.users.map((user, index) => {
      const grossSalary = this.getSalaryForRole(user.role);
      const tax = Math.round(grossSalary * 0.15); // 15% tax
      const pf = Math.round(grossSalary * 0.12); // 12% PF
      const esi = Math.round(grossSalary * 0.05); // 5% ESI
      const professionalTax = 200;
      const loanDeduction = Math.round(grossSalary * 0.05); // 5% loan
      const advanceDeduction = Math.round(grossSalary * 0.03); // 3% advance
      const other = Math.round(grossSalary * 0.02); // 2% other
      const totalDeduction = tax + pf + esi + professionalTax + loanDeduction + advanceDeduction + other;
      const netSalary = grossSalary - totalDeduction;

      return {
        id: `DED${String(user.id).padStart(3, '0')}`,
        employeeId: `EMP${String(user.id).padStart(3, '0')}`,
        employeeName: user.firstName + (user.lastName ? ' ' + user.lastName : ''),
        employeePhoto: `https://images.unsplash.com/photo-${1500000000000 + user.id}?w=150&h=150&fit=crop&crop=face`,
        department: this.getDepartmentForRole(user.role),
        month: 'December',
        year: this.getRandomYear(),
        tax: tax,
        pf: pf,
        esi: esi,
        professionalTax: professionalTax,
        loanDeduction: loanDeduction,
        advanceDeduction: advanceDeduction,
        other: other,
        totalDeduction: totalDeduction,
        grossSalary: grossSalary,
        netSalary: netSalary,
        status: this.getRandomStatus(),
        createdAt: this.getRandomDate(),
        approvedBy: this.getRandomStatus() === 'Approved' ? this.currentUser.name : undefined,
        notes: `${user.role} deductions applied`
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
    const departmentMap: { [key: string]: string } = {
      'ADMIN': 'Human Resources',
      'EMPLOYEE': 'Engineering',
      'MANAGER': 'Management',
      'HR': 'Human Resources'
    };
    return departmentMap[role] || 'General';
  }

  private getRandomStatus(): 'Pending' | 'Approved' | 'Rejected' {
    const statuses: ('Pending' | 'Approved' | 'Rejected')[] = ['Pending', 'Approved', 'Approved', 'Approved']; // More approved
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  private getRandomYear(): number {
    const years = [2022, 2023, 2024, 2025];
    return years[Math.floor(Math.random() * years.length)];
  }

  private getRandomDate(): string {
    const year = this.getRandomYear();
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  addDeduction() {
    alert('Add Deduction functionality will be implemented here');
  }

  viewDeduction(deduction: any) {
    this.selectedDeduction = deduction;
  }

  closeModal() {
    this.selectedDeduction = null;
  }

  editDeduction(deduction: any) {
    alert(`Edit deduction: ${deduction.employeeName}`);
  }

  deleteDeduction(deduction: any) {
    if (confirm(`Are you sure you want to delete deduction for ${deduction.employeeName}?`)) {
      alert(`Deduction for ${deduction.employeeName} deleted successfully`);
    }
  }

  approveDeduction(deduction: any) {
    deduction.status = 'Approved';
    deduction.approvedBy = this.currentUser.name;
    alert(`Deduction for ${deduction.employeeName} approved successfully`);
  }

  rejectDeduction(deduction: any) {
    deduction.status = 'Rejected';
    alert(`Deduction for ${deduction.employeeName} rejected`);
  }

  // Get filtered and sorted deductions
  get filteredDeductions() {
    let filtered = this.deductions.filter(ded => {
      const matchesSearch = ded.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           ded.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           ded.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           ded.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesMonth = this.selectedMonth === 'All' || ded.month === this.selectedMonth;
      const matchesYear = this.selectedYear === 'All' || ded.year.toString() === this.selectedYear;
      const matchesStatus = this.selectedStatus === 'All' || ded.status === this.selectedStatus;
      const matchesDepartment = this.selectedDepartment === 'All' || ded.department === this.selectedDepartment;
      
      return matchesSearch && matchesMonth && matchesYear && matchesStatus && matchesDepartment;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[this.sortBy as keyof typeof a];
      let bValue = b[this.sortBy as keyof typeof b];
      
      // Handle undefined values
      if (aValue === undefined) aValue = '';
      if (bValue === undefined) bValue = '';
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }

  // Sort deductions
  sortDeductions(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
  }

  // Clear filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedMonth = 'All';
    this.selectedYear = 'All';
    this.selectedStatus = 'All';
    this.selectedDepartment = 'All';
    this.sortBy = 'employeeName';
    this.sortOrder = 'asc';
  }

  // Analytics methods
  getTotalDeductions(): number {
    return this.deductions.reduce((sum, ded) => sum + ded.totalDeduction, 0);
  }

  getTotalTax(): number {
    return this.deductions.reduce((sum, ded) => sum + ded.tax, 0);
  }

  getTotalPF(): number {
    return this.deductions.reduce((sum, ded) => sum + ded.pf, 0);
  }

  getTotalESI(): number {
    return this.deductions.reduce((sum, ded) => sum + ded.esi, 0);
  }

  getPendingCount(): number {
    return this.deductions.filter(ded => ded.status === 'Pending').length;
  }

  getApprovedCount(): number {
    return this.deductions.filter(ded => ded.status === 'Approved').length;
  }

  getRejectedCount(): number {
    return this.deductions.filter(ded => ded.status === 'Rejected').length;
  }

  getDeductionByStatus() {
    return [
      { status: 'Pending', count: this.getPendingCount(), color: '#f59e0b' },
      { status: 'Approved', count: this.getApprovedCount(), color: '#10b981' },
      { status: 'Rejected', count: this.getRejectedCount(), color: '#ef4444' }
    ];
  }

  getDeductionByDepartment() {
    const distribution = this.deductions.reduce((acc, ded) => {
      acc[ded.department] = (acc[ded.department] || 0) + 1;
      return acc;
    }, {} as any);
    
    return Object.entries(distribution).map(([department, count]) => ({
      department,
      count: count as number,
      percentage: ((count as number) / this.deductions.length) * 100
    }));
  }

  getTopDeductions() {
    return this.deductions
      .sort((a, b) => b.totalDeduction - a.totalDeduction)
      .slice(0, 5);
  }

  getAverageDeductionByDepartment() {
    const departmentDeductions = this.deductions.reduce((acc, ded) => {
      if (!acc[ded.department]) {
        acc[ded.department] = { total: 0, count: 0 };
      }
      acc[ded.department].total += ded.totalDeduction;
      acc[ded.department].count += 1;
      return acc;
    }, {} as any);

    return Object.entries(departmentDeductions).map(([department, data]: [string, any]) => ({
      department,
      averageDeduction: Math.round(data.total / data.count)
    }));
  }

  // Helper methods for charts
  getDepartmentColor(department: string): string {
    const colors: { [key: string]: string } = {
      'Engineering': '#667eea',
      'Design': '#f093fb',
      'Human Resources': '#4facfe',
      'Marketing': '#43e97b',
      'Sales': '#fa709a'
    };
    return colors[department] || '#64748b';
  }

  getMaxStatusCount(): number {
    return Math.max(...this.getDeductionByStatus().map(status => status.count));
  }

  getMaxAverageDeduction(): number {
    const averages = this.getAverageDeductionByDepartment();
    return averages.length > 0 ? Math.max(...averages.map(avg => avg.averageDeduction)) : 1;
  }

  // Helper methods for template
  getTotalDeductionsK(): number {
    return Math.round(this.getTotalDeductions() / 1000);
  }

  getTotalTaxK(): number {
    return Math.round(this.getTotalTax() / 1000);
  }

  getTotalPFK(): number {
    return Math.round(this.getTotalPF() / 1000);
  }

  getTotalESIK(): number {
    return Math.round(this.getTotalESI() / 1000);
  }

  handleImageError(event: any): void {
    const target = event.target as HTMLImageElement;
    const fallback = target.nextElementSibling as HTMLElement;
    if (target && fallback) {
      target.style.display = 'none';
      fallback.style.display = 'flex';
    }
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.location.back();
  }
}
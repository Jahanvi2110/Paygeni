import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

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

@Component({
  selector: 'app-deduction',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {
  currentUser: any = null;
  
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
  years = ['All', '2023', '2024', '2025'];
  statuses = ['All', 'Pending', 'Approved', 'Rejected'];
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  deductions: Deduction[] = [
    {
      id: 'DED001',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      employeePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      tax: 8500,
      pf: 2400,
      esi: 1200,
      professionalTax: 200,
      loanDeduction: 5000,
      advanceDeduction: 2000,
      other: 800,
      totalDeduction: 20100,
      grossSalary: 95000,
      netSalary: 74900,
      status: 'Approved',
      createdAt: '2024-12-01',
      approvedBy: 'Sarah Johnson',
      notes: 'Standard deductions applied'
    },
    {
      id: 'DED002',
      employeeId: 'EMP002',
      employeeName: 'Alice Johnson',
      employeePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      department: 'Design',
      month: 'December',
      year: 2024,
      tax: 7200,
      pf: 2040,
      esi: 1020,
      professionalTax: 200,
      loanDeduction: 3000,
      advanceDeduction: 1500,
      other: 600,
      totalDeduction: 15560,
      grossSalary: 85000,
      netSalary: 69440,
      status: 'Approved',
      createdAt: '2024-12-01',
      approvedBy: 'Mike Chen',
      notes: 'Design team deductions'
    },
    {
      id: 'DED003',
      employeeId: 'EMP003',
      employeeName: 'Bob Wilson',
      employeePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Human Resources',
      month: 'December',
      year: 2024,
      tax: 8100,
      pf: 2160,
      esi: 1080,
      professionalTax: 200,
      loanDeduction: 4000,
      advanceDeduction: 1800,
      other: 700,
      totalDeduction: 17860,
      grossSalary: 90000,
      netSalary: 72140,
      status: 'Pending',
      createdAt: '2024-12-02',
      notes: 'HR manager deductions pending approval'
    },
    {
      id: 'DED004',
      employeeId: 'EMP004',
      employeeName: 'Charlie Brown',
      employeePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      tax: 9450,
      pf: 2520,
      esi: 1260,
      professionalTax: 200,
      loanDeduction: 6000,
      advanceDeduction: 2500,
      other: 900,
      totalDeduction: 22830,
      grossSalary: 105000,
      netSalary: 82170,
      status: 'Approved',
      createdAt: '2024-12-01',
      approvedBy: 'Sarah Johnson',
      notes: 'Senior engineer deductions'
    },
    {
      id: 'DED005',
      employeeId: 'EMP005',
      employeeName: 'Diana Prince',
      employeePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      month: 'December',
      year: 2024,
      tax: 7200,
      pf: 1920,
      esi: 960,
      professionalTax: 200,
      loanDeduction: 2500,
      advanceDeduction: 1200,
      other: 500,
      totalDeduction: 14280,
      grossSalary: 80000,
      netSalary: 65720,
      status: 'Approved',
      createdAt: '2024-12-01',
      approvedBy: 'Jennifer Lee',
      notes: 'Marketing team deductions'
    },
    {
      id: 'DED006',
      employeeId: 'EMP006',
      employeeName: 'Eve Wilson',
      employeePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      department: 'Sales',
      month: 'December',
      year: 2024,
      tax: 6300,
      pf: 1680,
      esi: 840,
      professionalTax: 200,
      loanDeduction: 2000,
      advanceDeduction: 1000,
      other: 400,
      totalDeduction: 12420,
      grossSalary: 70000,
      netSalary: 57580,
      status: 'Rejected',
      createdAt: '2024-12-02',
      notes: 'Deduction rejected due to incorrect calculations'
    },
    {
      id: 'DED007',
      employeeId: 'EMP007',
      employeeName: 'Frank Miller',
      employeePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      tax: 10800,
      pf: 2880,
      esi: 1440,
      professionalTax: 200,
      loanDeduction: 8000,
      advanceDeduction: 3000,
      other: 1200,
      totalDeduction: 27520,
      grossSalary: 120000,
      netSalary: 92480,
      status: 'Approved',
      createdAt: '2024-12-01',
      approvedBy: 'Sarah Johnson',
      notes: 'Lead developer deductions'
    },
    {
      id: 'DED008',
      employeeId: 'EMP008',
      employeeName: 'Grace Lee',
      employeePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      month: 'December',
      year: 2024,
      tax: 9900,
      pf: 2640,
      esi: 1320,
      professionalTax: 200,
      loanDeduction: 5000,
      advanceDeduction: 2200,
      other: 1000,
      totalDeduction: 22260,
      grossSalary: 110000,
      netSalary: 87740,
      status: 'Pending',
      createdAt: '2024-12-02',
      notes: 'Product manager deductions pending review'
    }
  ];

  constructor(
    private authService: AuthService,
    private location: Location
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
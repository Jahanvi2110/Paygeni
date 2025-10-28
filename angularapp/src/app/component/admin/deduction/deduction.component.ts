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
  showEditModal = false;
  editingDeduction: any = null;
  isSubmittingEdit = false;
  showAddModal = false;
  newDeduction: any = null;
  isSubmittingAdd = false;
  
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
    
    // Load real deductions from database
    this.http.get<any[]>(`${environment.apiUrl}/admin/deductions`)
      .subscribe({
        next: (deductions) => {
          console.log('✅ Loaded deductions from database:', deductions);
          this.deductions = deductions.map((ded) => ({
            id: ded.id,
            employeeId: ded.employeeId,
            employeeName: ded.employeeName,
            employeePhoto: ded.employeePhoto || '',
            department: ded.department,
            month: ded.month,
            year: ded.year,
            tax: ded.tax || 0,
            pf: ded.pf || 0,
            esi: ded.esi || 0,
            professionalTax: ded.professionalTax || 0,
            loanDeduction: ded.loanDeduction || 0,
            advanceDeduction: ded.advanceDeduction || 0,
            other: ded.other || 0,
            totalDeduction: ded.totalDeduction || 0,
            grossSalary: ded.grossSalary || 0,
            netSalary: ded.netSalary || 0,
            status: ded.status,
            createdAt: ded.createdAt,
            approvedBy: ded.approvedBy,
            notes: ded.notes
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading deductions:', error);
          // Fallback to generating from users if deductions endpoint fails
          this.loadUsersAsDeductions();
        }
      });
  }

  private loadUsersAsDeductions() {
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
    // Initialize a new deduction with sensible defaults
    const defaultMonth = this.months.includes('December') ? 'December' : this.months[1];
    const currentYear = new Date().getFullYear();
    this.newDeduction = {
      employeeId: '',
      employeeName: '',
      employeePhoto: '',
      department: 'Engineering',
      month: defaultMonth,
      year: currentYear,
      tax: 0,
      pf: 0,
      esi: 0,
      professionalTax: 0,
      loanDeduction: 0,
      advanceDeduction: 0,
      other: 0,
      totalDeduction: 0,
      grossSalary: 0,
      netSalary: 0,
      status: 'Pending',
      approvedBy: '',
      notes: ''
    };
    this.showAddModal = true;
    this.onAddFieldChange();
  }

  viewDeduction(deduction: any) {
    this.selectedDeduction = deduction;
  }

  closeModal() {
    this.selectedDeduction = null;
  }

  editDeduction(deduction: any) {
    console.log('🔄 Opening edit modal for deduction:', deduction);
    this.editingDeduction = { ...deduction }; // Create a copy for editing
    this.showEditModal = true;
    this.onEditFieldChange();
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingDeduction = null;
    this.isSubmittingEdit = false;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newDeduction = null;
    this.isSubmittingAdd = false;
  }

  submitEditDeduction() {
    if (!this.editingDeduction) return;

    // Validate required fields (employee name is auto-populated, so not required in validation)
    if (!this.editingDeduction.employeeId || 
        !this.editingDeduction.month || !this.editingDeduction.year) {
      alert('❌ Please fill in all required fields (Employee ID, Month, Year)');
      return;
    }

    this.isSubmittingEdit = true;

    // Ensure calculated fields are up-to-date before submit
    this.onEditFieldChange();

    // Prepare the update data
    const updateData = {
      employeeId: this.editingDeduction.employeeId,
      employeeName: this.editingDeduction.employeeName,
      department: this.editingDeduction.department,
      month: this.editingDeduction.month,
      year: this.editingDeduction.year,
      tax: this.editingDeduction.tax || 0,
      pf: this.editingDeduction.pf || 0,
      esi: this.editingDeduction.esi || 0,
      professionalTax: this.editingDeduction.professionalTax || 0,
      loanDeduction: this.editingDeduction.loanDeduction || 0,
      advanceDeduction: this.editingDeduction.advanceDeduction || 0,
      other: this.editingDeduction.other || 0,
      totalDeduction: this.editingDeduction.totalDeduction,
      grossSalary: this.editingDeduction.grossSalary || 0,
      netSalary: this.editingDeduction.netSalary || 0,
      status: this.editingDeduction.status,
      approvedBy: this.editingDeduction.approvedBy,
      notes: this.editingDeduction.notes
    };

    console.log('🚀 Updating deduction:', updateData);

    // Call the backend API to update deduction
    this.http.put<any>(`${environment.apiUrl}/admin/deductions/${this.editingDeduction.id}`, updateData)
      .subscribe({
        next: (response) => {
          console.log('✅ Deduction updated successfully:', response);
          
          // Update the deduction in the local array
          const index = this.deductions.findIndex(ded => ded.id === this.editingDeduction.id);
          if (index !== -1) {
            this.deductions[index] = { ...this.deductions[index], ...updateData };
          }
          
          alert(`✅ Deduction record for ${this.editingDeduction.employeeName} updated successfully!`);
          this.closeEditModal();
          this.isSubmittingEdit = false;
        },
        error: (error) => {
          console.error('❌ Error updating deduction:', error);
          alert('❌ Error updating deduction: ' + (error.error?.message || error.message));
          this.isSubmittingEdit = false;
        }
      });
  }

  resetEditForm() {
    if (this.editingDeduction) {
      // Find the original deduction data
      const originalDeduction = this.deductions.find(ded => ded.id === this.editingDeduction.id);
      if (originalDeduction) {
        this.editingDeduction = { ...originalDeduction }; // Reset to original values
      }
    }
  }

  deleteDeduction(deduction: any) {
    if (confirm(`Are you sure you want to delete deduction for ${deduction.employeeName}?\n\nThis action cannot be undone.`)) {
      console.log('🗑️ Deleting deduction:', deduction);
      
      // Call the backend API to delete deduction
      this.http.delete<any>(`${environment.apiUrl}/admin/deductions/${deduction.id}`)
        .subscribe({
          next: (response) => {
            console.log('✅ Deduction deleted successfully:', response);
            
            // Remove the deduction from the local array
            const index = this.deductions.findIndex(ded => ded.id === deduction.id);
            if (index !== -1) {
              this.deductions.splice(index, 1);
            }
            
            alert(`✅ Deduction record for ${deduction.employeeName} deleted successfully!`);
          },
          error: (error) => {
            console.error('❌ Error deleting deduction:', error);
            alert('❌ Error deleting deduction: ' + (error.error?.message || error.message));
          }
        });
    }
  }

  // Live updates for calculated fields during edit
  onEditFieldChange() {
    if (!this.editingDeduction) return;
    const toNumber = (v: any) => {
      const n = parseFloat(v);
      return isNaN(n) ? 0 : n;
    };
    this.editingDeduction.tax = toNumber(this.editingDeduction.tax);
    this.editingDeduction.pf = toNumber(this.editingDeduction.pf);
    this.editingDeduction.esi = toNumber(this.editingDeduction.esi);
    this.editingDeduction.professionalTax = toNumber(this.editingDeduction.professionalTax);
    this.editingDeduction.loanDeduction = toNumber(this.editingDeduction.loanDeduction);
    this.editingDeduction.advanceDeduction = toNumber(this.editingDeduction.advanceDeduction);
    this.editingDeduction.other = toNumber(this.editingDeduction.other);
    this.editingDeduction.grossSalary = toNumber(this.editingDeduction.grossSalary);

    this.editingDeduction.totalDeduction =
      this.editingDeduction.tax +
      this.editingDeduction.pf +
      this.editingDeduction.esi +
      this.editingDeduction.professionalTax +
      this.editingDeduction.loanDeduction +
      this.editingDeduction.advanceDeduction +
      this.editingDeduction.other;
    this.editingDeduction.netSalary =
      this.editingDeduction.grossSalary - (this.editingDeduction.totalDeduction || 0);
  }

  // Live updates for calculated fields during add
  onAddFieldChange() {
    if (!this.newDeduction) return;
    const toNumber = (v: any) => {
      const n = parseFloat(v);
      return isNaN(n) ? 0 : n;
    };
    this.newDeduction.tax = toNumber(this.newDeduction.tax);
    this.newDeduction.pf = toNumber(this.newDeduction.pf);
    this.newDeduction.esi = toNumber(this.newDeduction.esi);
    this.newDeduction.professionalTax = toNumber(this.newDeduction.professionalTax);
    this.newDeduction.loanDeduction = toNumber(this.newDeduction.loanDeduction);
    this.newDeduction.advanceDeduction = toNumber(this.newDeduction.advanceDeduction);
    this.newDeduction.other = toNumber(this.newDeduction.other);
    this.newDeduction.grossSalary = toNumber(this.newDeduction.grossSalary);

    this.newDeduction.totalDeduction =
      this.newDeduction.tax +
      this.newDeduction.pf +
      this.newDeduction.esi +
      this.newDeduction.professionalTax +
      this.newDeduction.loanDeduction +
      this.newDeduction.advanceDeduction +
      this.newDeduction.other;
    this.newDeduction.netSalary =
      this.newDeduction.grossSalary - (this.newDeduction.totalDeduction || 0);
  }

  submitAddDeduction() {
    if (!this.newDeduction) return;

    if (!this.newDeduction.employeeId || !this.newDeduction.employeeName || !this.newDeduction.month || !this.newDeduction.year) {
      alert('❌ Please fill in required fields: Employee ID, Employee Name, Month, Year');
      return;
    }

    this.isSubmittingAdd = true;
    this.onAddFieldChange();

    const createData = {
      employeeId: this.newDeduction.employeeId,
      employeeName: this.newDeduction.employeeName,
      department: this.newDeduction.department,
      month: this.newDeduction.month,
      year: this.newDeduction.year,
      tax: this.newDeduction.tax,
      pf: this.newDeduction.pf,
      esi: this.newDeduction.esi,
      professionalTax: this.newDeduction.professionalTax,
      loanDeduction: this.newDeduction.loanDeduction,
      advanceDeduction: this.newDeduction.advanceDeduction,
      other: this.newDeduction.other,
      totalDeduction: this.newDeduction.totalDeduction,
      grossSalary: this.newDeduction.grossSalary,
      netSalary: this.newDeduction.netSalary,
      status: this.newDeduction.status,
      approvedBy: this.newDeduction.approvedBy,
      notes: this.newDeduction.notes
    };

    this.http.post<any>(`${environment.apiUrl}/admin/deductions`, createData)
      .subscribe({
        next: (response) => {
          const created = {
            id: response?.id ?? `DED${Math.floor(Math.random()*100000)}`,
            employeePhoto: '',
            createdAt: response?.createdAt ?? new Date().toISOString().split('T')[0],
            ...createData
          };
          this.deductions.unshift(created as any);
          alert(`✅ Deduction created for ${created.employeeName}`);
          this.closeAddModal();
          this.isSubmittingAdd = false;
        },
        error: (error) => {
          console.error('❌ Error creating deduction:', error);
          alert('❌ Error creating deduction: ' + (error.error?.message || error.message));
          this.isSubmittingAdd = false;
        }
      });
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
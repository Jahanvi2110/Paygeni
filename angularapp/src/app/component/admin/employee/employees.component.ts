import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  currentUser: any = null;
  
  // Search and filter properties
  searchTerm = '';
  selectedDepartment = 'All';
  selectedStatus = 'All';
  sortBy = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  // Modal properties
  selectedEmployee: any = null;
  showEditModal = false;
  editingEmployee: any = null;
  isSubmittingEdit = false;
  showAddModal = false;
  newEmployee: any = null;
  isSubmittingAdd = false;
  
  // Department options
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  // Status options
  statuses = ['All', 'Active', 'Inactive', 'On Leave'];
  
  // Real employees from signup data
  employees: any[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadEmployees();
  }

  refreshEmployees() {
    console.log('🔄 Refreshing employees...');
    this.loadEmployees();
  }

  private loadEmployees() {
    this.isLoading = true;
    
    // Load real employees from database
    this.http.get<any[]>(`${environment.apiUrl}/employees`)
      .subscribe({
        next: (employees) => {
          console.log('✅ Loaded employees from database:', employees);
          this.employees = employees.map((emp, index) => ({
            id: emp.id,
            name: emp.firstName + (emp.lastName ? ' ' + emp.lastName : ''),
            role: 'Employee',
            department: emp.department || 'General',
            email: emp.email,
            phone: emp.phoneNumber,
            salary: emp.salary || 50000,
            joinDate: emp.hireDate || this.getRandomJoinDate(),
            status: emp.status === 'ACTIVE' ? 'Active' : 'Inactive',
            photo: null,
            location: emp.address || 'Company Office',
            manager: 'Department Manager',
            skills: this.getSkillsForDepartment(emp.department),
            experience: this.getExperienceFromJoinDate(emp.hireDate),
            lastPromotion: this.getLastPromotionDate(emp.hireDate),
            performance: 4.5,
            projects: Math.floor(Math.random() * 10) + 1,
            teamSize: 1
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading employees:', error);
          // Fallback to users if employees endpoint fails
          this.loadUsersAsEmployees();
        }
      });
  }

  private loadUsersAsEmployees() {
    this.http.get<any[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          // Filter out admin users and transform signup users to employee format
          const employeeUsers = users.filter(user => user.role !== 'ADMIN');
          this.employees = employeeUsers.map((user, index) => ({
            id: user.id, // Use actual numeric ID from database
            name: user.firstName,
            role: 'Employee',
            department: this.getDepartmentForRole(user.role),
            email: user.email,
            phone: user.phoneNumber,
            salary: this.getSalaryForRole(user.role),
            joinDate: this.getRandomJoinDate(),
            status: 'Active',
            photo: null,
            location: 'Company Office',
            manager: 'Department Manager',
            skills: this.getSkillsForRole(user.role),
            experience: '1+ years',
            lastPromotion: this.getRandomJoinDate(),
            performance: 4.5,
            projects: Math.floor(Math.random() * 10) + 1,
            teamSize: 1
          }));

          // Add 3 extra employees
          this.addExtraEmployees();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.isLoading = false;
        }
      });
  }

  private getRandomJoinDate(): string {
    // Generate random join dates between 2018 and 2024
    const startYear = 2018;
    const endYear = 2024;
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid month-end issues
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private addExtraEmployees() {
    const extraEmployees = [
      {
        id: 1001,
        name: 'Sarah Johnson',
        role: 'Employee',
        department: 'Marketing',
        email: 'sarah.johnson@company.com',
        phone: '+91 98765 43210',
        salary: 45000,
        joinDate: this.getRandomJoinDate(),
        status: 'Active',
        photo: null,
        location: 'Company Office',
        manager: 'Marketing Manager',
        skills: ['Digital Marketing', 'Content Creation', 'Social Media'],
        experience: '2+ years',
        lastPromotion: this.getRandomJoinDate(),
        performance: 4.2,
        projects: 8,
        teamSize: 1
      },
      {
        id: 1002,
        name: 'Michael Chen',
        role: 'Employee',
        department: 'Engineering',
        email: 'michael.chen@company.com',
        phone: '+91 98765 43211',
        salary: 55000,
        joinDate: this.getRandomJoinDate(),
        status: 'Active',
        photo: null,
        location: 'Company Office',
        manager: 'Engineering Manager',
        skills: ['Java', 'Spring Boot', 'Angular', 'Database'],
        experience: '3+ years',
        lastPromotion: this.getRandomJoinDate(),
        performance: 4.7,
        projects: 12,
        teamSize: 1
      },
      {
        id: 1003,
        name: 'Priya Sharma',
        role: 'Employee',
        department: 'Human Resources',
        email: 'priya.sharma@company.com',
        phone: '+91 98765 43212',
        salary: 42000,
        joinDate: this.getRandomJoinDate(),
        status: 'Active',
        photo: null,
        location: 'Company Office',
        manager: 'HR Manager',
        skills: ['Recruitment', 'Employee Relations', 'Training'],
        experience: '1+ years',
        lastPromotion: this.getRandomJoinDate(),
        performance: 4.0,
        projects: 5,
        teamSize: 1
      }
    ];

    // Add extra employees to the existing list
    this.employees = [...this.employees, ...extraEmployees];
  }

  private getExperienceFromJoinDate(hireDate: string): string {
    if (!hireDate) return '1+ years';
    const joinDate = new Date(hireDate);
    const now = new Date();
    const years = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
    return years > 0 ? `${years}+ years` : 'Less than 1 year';
  }

  private getLastPromotionDate(hireDate: string): string {
    if (!hireDate) return this.getRandomJoinDate();
    const joinDate = new Date(hireDate);
    const promotionDate = new Date(joinDate.getTime() + (Math.random() * 365 * 24 * 60 * 60 * 1000)); // Random date after join
    return promotionDate.toISOString().split('T')[0];
  }

  private getDepartmentForRole(role: string): string {
    const departments = ['Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales', 'Operations'];
    return role === 'ADMIN' ? 'Administration' : departments[Math.floor(Math.random() * departments.length)];
  }

  private getSalaryForRole(role: string): number {
    return role === 'ADMIN' ? 100000 : 75000;
  }

  private getSkillsForRole(role: string): string[] {
    if (role === 'ADMIN') {
      return ['Management', 'Leadership', 'Strategic Planning', 'Team Building'];
    }
    const skillSets = [
      ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
      ['Recruitment', 'Employee Relations', 'HRIS', 'Training'],
      ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
      ['Sales Strategy', 'Customer Relations', 'CRM', 'Negotiation']
    ];
    return skillSets[Math.floor(Math.random() * skillSets.length)];
  }

  private getSkillsForDepartment(department: string): string[] {
    const departmentSkills: { [key: string]: string[] } = {
      'Engineering': ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Java', 'Spring Boot'],
      'Human Resources': ['Recruitment', 'Employee Relations', 'HRIS', 'Training', 'Performance Management'],
      'Finance': ['Financial Analysis', 'Budgeting', 'Accounting', 'Excel', 'Financial Modeling'],
      'Marketing': ['Digital Marketing', 'SEO', 'Social Media', 'Analytics', 'Content Creation'],
      'Administration': ['Office Management', 'Administrative Support', 'Documentation', 'Communication'],
      'Design': ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'UI/UX Design']
    };
    return departmentSkills[department] || ['General Skills', 'Communication', 'Problem Solving'];
  }

  addEmployee() {
    this.newEmployee = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      department: 'Engineering',
      salary: 0,
      status: 'ACTIVE',
      hireDate: new Date().toISOString().split('T')[0],
      address: 'Company Office'
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newEmployee = null;
    this.isSubmittingAdd = false;
  }

  submitAddEmployee() {
    if (!this.newEmployee) return;
    if (!this.newEmployee.firstName || !this.newEmployee.email || !this.newEmployee.phoneNumber) {
      alert('❌ Please fill in required fields: First Name, Email, Phone');
      return;
    }

    this.isSubmittingAdd = true;
    this.http.post<any>(`${environment.apiUrl}/employees`, this.newEmployee)
      .subscribe({
        next: (response) => {
          const created = {
            id: response?.id ?? Math.floor(Math.random()*100000),
            name: `${this.newEmployee.firstName} ${this.newEmployee.lastName ?? ''}`.trim(),
            role: 'Employee',
            department: this.newEmployee.department,
            email: this.newEmployee.email,
            phone: this.newEmployee.phoneNumber,
            salary: this.newEmployee.salary,
            joinDate: this.newEmployee.hireDate,
            status: this.newEmployee.status === 'ACTIVE' ? 'Active' : 'Inactive',
            photo: null,
            location: this.newEmployee.address,
            manager: 'Department Manager',
            skills: this.getSkillsForDepartment(this.newEmployee.department),
            experience: '1+ years',
            lastPromotion: this.getRandomJoinDate(),
            performance: 4.0,
            projects: 1,
            teamSize: 1
          };
          this.employees.unshift(created);
          alert(`✅ Employee ${created.name} created successfully!`);
          this.closeAddModal();
          this.isSubmittingAdd = false;
        },
        error: (error) => {
          console.error('❌ Error creating employee:', error);
          alert('❌ Error creating employee: ' + (error.error?.message || error.message));
          this.isSubmittingAdd = false;
        }
      });
  }

  viewEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  closeModal() {
    this.selectedEmployee = null;
  }

  editEmployee(employee: any) {
    this.editingEmployee = { ...employee }; // Create a copy for editing
    this.showEditModal = true;
  }

  deleteEmployee(employee: any) {
    if (confirm(`Are you sure you want to delete ${employee.name}?\n\nThis action cannot be undone.`)) {
      console.log('🗑️ Deleting employee:', employee);
      
      // Call the backend API to delete employee (this will cascade delete user due to foreign key)
      this.http.delete<any>(`${environment.apiUrl}/employees/${employee.id}`)
        .subscribe({
          next: (response) => {
            console.log('✅ Employee deleted successfully:', response);
            
            // Remove the employee from the local array
            const index = this.employees.findIndex(emp => emp.id === employee.id);
            if (index !== -1) {
              this.employees.splice(index, 1);
            }
            
            alert(`✅ Employee ${employee.name} deleted successfully!`);
          },
          error: (error) => {
            console.error('❌ Error deleting employee:', error);
            alert('❌ Error deleting employee: ' + (error.error?.message || error.message));
          }
        });
    }
  }

  // Get filtered and sorted employees
  get filteredEmployees() {
    let filtered = this.employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           emp.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           emp.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           emp.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = this.selectedDepartment === 'All' || emp.department === this.selectedDepartment;
      const matchesStatus = this.selectedStatus === 'All' || emp.status === this.selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[this.sortBy as keyof typeof a];
      let bValue = b[this.sortBy as keyof typeof b];
      
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

  // Sort employees
  sortEmployees(column: string) {
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
    this.selectedDepartment = 'All';
    this.selectedStatus = 'All';
    this.sortBy = 'name';
    this.sortOrder = 'asc';
  }

  // Get employee count by status
  getEmployeeCountByStatus(status: string) {
    return this.employees.filter(emp => emp.status === status).length;
  }

  // Get total salary budget
  getTotalSalaryBudget() {
    return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
  }

  // Analytics methods for charts
  getDepartmentDistribution() {
    const distribution = this.employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as any);
    
    return Object.entries(distribution).map(([department, count]) => ({
      department,
      count: count as number,
      percentage: ((count as number) / this.employees.length) * 100
    }));
  }

  getSalaryDistribution() {
    const ranges = [
      { range: '60k-80k', min: 60000, max: 80000, count: 0 },
      { range: '80k-100k', min: 80000, max: 100000, count: 0 },
      { range: '100k-120k', min: 100000, max: 120000, count: 0 },
      { range: '120k+', min: 120000, max: Infinity, count: 0 }
    ];

    this.employees.forEach(emp => {
      const range = ranges.find(r => emp.salary >= r.min && emp.salary < r.max);
      if (range) range.count++;
    });

    return ranges.filter(r => r.count > 0);
  }

  getPerformanceDistribution() {
    const performance = this.employees.reduce((acc, emp) => {
      const rating = Math.floor(emp.performance);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as any);

    return Object.entries(performance).map(([rating, count]) => ({
      rating: `${rating} stars`,
      count: count as number
    }));
  }

  getTopPerformers() {
    return this.employees
      .filter(emp => emp.status === 'Active')
      .sort((a, b) => b.performance - a.performance)
      .slice(0, 5);
  }

  getAverageSalaryByDepartment() {
    const departmentSalaries = this.employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { total: 0, count: 0 };
      }
      acc[emp.department].total += emp.salary;
      acc[emp.department].count += 1;
      return acc;
    }, {} as any);

    return Object.entries(departmentSalaries).map(([department, data]: [string, any]) => ({
      department,
      averageSalary: Math.round(data.total / data.count)
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

  getMaxSalaryCount(): number {
    return Math.max(...this.getSalaryDistribution().map(range => range.count));
  }

  getMaxPerformanceCount(): number {
    return Math.max(...this.getPerformanceDistribution().map(perf => perf.count));
  }

  // Helper methods for template
  getActiveEmployeeCount(): number {
    return this.employees.filter(emp => emp.status === 'Active').length;
  }

  getTotalSalaryBudgetK(): number {
    return Math.round(this.getTotalSalaryBudget() / 1000);
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

  // Edit Employee Modal Methods
  closeEditModal() {
    this.showEditModal = false;
    this.editingEmployee = null;
    this.isSubmittingEdit = false;
  }

  submitEditEmployee() {
    if (!this.editingEmployee) return;

    // Validate required fields
    if (!this.editingEmployee.name || !this.editingEmployee.email || !this.editingEmployee.phone) {
      alert('❌ Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    this.isSubmittingEdit = true;

    // Prepare the update data for employee table
    const employeeUpdateData = {
      firstName: this.editingEmployee.name.split(' ')[0],
      lastName: this.editingEmployee.name.split(' ').slice(1).join(' ') || '',
      email: this.editingEmployee.email,
      phoneNumber: this.editingEmployee.phone,
      department: this.editingEmployee.department,
      salary: this.editingEmployee.salary,
      status: this.editingEmployee.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      hireDate: this.editingEmployee.joinDate,
      address: this.editingEmployee.location
    };

    console.log('🚀 Updating employee:', employeeUpdateData);

    // Call the backend API to update employee
    this.http.put<any>(`${environment.apiUrl}/employees/${this.editingEmployee.id}`, employeeUpdateData)
      .subscribe({
        next: (response) => {
          console.log('✅ Employee updated successfully:', response);
          
          // Also update the corresponding user record
          const userUpdateData = {
            firstName: employeeUpdateData.firstName,
            lastName: employeeUpdateData.lastName,
            email: employeeUpdateData.email,
            phoneNumber: employeeUpdateData.phoneNumber,
            department: employeeUpdateData.department,
            status: employeeUpdateData.status
          };

          // Update user record as well
          this.http.put<any>(`${environment.apiUrl}/auth/users/${this.editingEmployee.id}`, userUpdateData)
            .subscribe({
              next: (userResponse) => {
                console.log('✅ User updated successfully:', userResponse);
                
                // Update the employee in the local array
                const index = this.employees.findIndex(emp => emp.id === this.editingEmployee.id);
                if (index !== -1) {
                  this.employees[index] = { ...this.employees[index], ...this.editingEmployee };
                }
                
                alert(`✅ Employee ${this.editingEmployee.name} updated successfully!`);
                this.closeEditModal();
                this.isSubmittingEdit = false;
              },
              error: (userError) => {
                console.error('❌ Error updating user:', userError);
                // Employee was updated but user update failed
                alert(`⚠️ Employee updated but user record update failed: ${userError.error?.message || userError.message}`);
                this.isSubmittingEdit = false;
              }
            });
        },
        error: (error) => {
          console.error('❌ Error updating employee:', error);
          alert('❌ Error updating employee: ' + (error.error?.message || error.message));
          this.isSubmittingEdit = false;
        }
      });
  }

  resetEditForm() {
    if (this.editingEmployee) {
      // Reset to original values
      const originalEmployee = this.employees.find(emp => emp.id === this.editingEmployee.id);
      if (originalEmployee) {
        this.editingEmployee = { ...originalEmployee };
      }
    }
  }
}
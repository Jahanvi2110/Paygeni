import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

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
  
  // Department options
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  // Status options
  statuses = ['All', 'Active', 'Inactive', 'On Leave'];
  
  employees = [
    { 
      id: 'EMP001', 
      name: 'John Smith', 
      role: 'Senior Software Developer',
      department: 'Engineering',
      email: 'john@company.com',
      phone: '1234567890',
      salary: 95000,
      joinDate: '2023-01-15',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'New York, NY',
      manager: 'Sarah Johnson',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      experience: '5 years',
      lastPromotion: '2023-06-01',
      performance: 4.8,
      projects: 12,
      teamSize: 3
    },
    { 
      id: 'EMP002', 
      name: 'Alice Johnson', 
      role: 'Senior UI/UX Designer',
      department: 'Design',
      email: 'alice@company.com',
      phone: '1234567891',
      salary: 85000,
      joinDate: '2023-02-20',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'San Francisco, CA',
      manager: 'Mike Chen',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
      experience: '4 years',
      lastPromotion: '2023-08-15',
      performance: 4.6,
      projects: 8,
      teamSize: 2
    },
    { 
      id: 'EMP003', 
      name: 'Bob Wilson', 
      role: 'HR Manager',
      department: 'Human Resources',
      email: 'bob@company.com',
      phone: '1234567892',
      salary: 90000,
      joinDate: '2022-11-10',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: 'Chicago, IL',
      manager: 'CEO',
      skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Training'],
      experience: '8 years',
      lastPromotion: '2022-11-10',
      performance: 4.9,
      projects: 15,
      teamSize: 5
    },
    { 
      id: 'EMP004', 
      name: 'Charlie Brown', 
      role: 'DevOps Engineer',
      department: 'Engineering',
      email: 'charlie@company.com',
      phone: '1234567893',
      salary: 105000,
      joinDate: '2023-03-05',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      location: 'Austin, TX',
      manager: 'Sarah Johnson',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      experience: '6 years',
      lastPromotion: '2023-09-01',
      performance: 4.7,
      projects: 10,
      teamSize: 4
    },
    { 
      id: 'EMP005', 
      name: 'Diana Prince', 
      role: 'Marketing Manager',
      department: 'Marketing',
      email: 'diana@company.com',
      phone: '1234567894',
      salary: 80000,
      joinDate: '2023-04-10',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Los Angeles, CA',
      manager: 'Jennifer Lee',
      skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
      experience: '5 years',
      lastPromotion: '2023-07-20',
      performance: 4.5,
      projects: 6,
      teamSize: 3
    },
    { 
      id: 'EMP006', 
      name: 'Eve Wilson', 
      role: 'Sales Executive',
      department: 'Sales',
      email: 'eve@company.com',
      phone: '1234567895',
      salary: 70000,
      joinDate: '2023-05-15',
      status: 'On Leave',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      location: 'Miami, FL',
      manager: 'Robert Davis',
      skills: ['Sales', 'CRM', 'Negotiation', 'Lead Generation'],
      experience: '3 years',
      lastPromotion: '2023-05-15',
      performance: 4.2,
      projects: 4,
      teamSize: 1
    },
    { 
      id: 'EMP007', 
      name: 'Frank Miller', 
      role: 'Lead Developer',
      department: 'Engineering',
      email: 'frank@company.com',
      phone: '1234567896',
      salary: 120000,
      joinDate: '2022-08-20',
      status: 'Active',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      location: 'Seattle, WA',
      manager: 'Sarah Johnson',
      skills: ['Python', 'Django', 'PostgreSQL', 'Microservices'],
      experience: '7 years',
      lastPromotion: '2023-01-10',
      performance: 4.9,
      projects: 18,
      teamSize: 6
    },
    { 
      id: 'EMP008', 
      name: 'Grace Lee', 
      role: 'Product Manager',
      department: 'Marketing',
      email: 'grace@company.com',
      phone: '1234567897',
      salary: 110000,
      joinDate: '2023-01-05',
      status: 'Inactive',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      location: 'Boston, MA',
      manager: 'Jennifer Lee',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
      experience: '6 years',
      lastPromotion: '2023-03-15',
      performance: 4.4,
      projects: 9,
      teamSize: 4
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

  addEmployee() {
    alert('Add Employee functionality will be implemented here');
    // Navigate to add employee form
  }

  viewEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  closeModal() {
    this.selectedEmployee = null;
  }

  editEmployee(employee: any) {
    alert(`Edit employee: ${employee.name}`);
    // Navigate to edit employee form
  }

  deleteEmployee(employee: any) {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      alert(`Employee ${employee.name} deleted successfully`);
      // Implement delete functionality
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
}

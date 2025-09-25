import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePhoto: string;
  department: string;
  month: string;
  year: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  totalWorkingDays: number;
  attendancePercentage: number;
  lateArrivals: number;
  earlyDepartures: number;
  overtimeHours: number;
  status: 'Excellent' | 'Good' | 'Average' | 'Poor';
  lastAttendanceDate: string;
  createdAt: string;
  notes?: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
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
  selectedAttendance: any = null;
  
  // Filter options
  months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['All', '2023', '2024', '2025'];
  statuses = ['All', 'Excellent', 'Good', 'Average', 'Poor'];
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  records: Attendance[] = [
    {
      id: 'ATT001',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      employeePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      presentDays: 22,
      absentDays: 0,
      leaveDays: 1,
      totalWorkingDays: 23,
      attendancePercentage: 95.7,
      lateArrivals: 2,
      earlyDepartures: 1,
      overtimeHours: 15,
      status: 'Excellent',
      lastAttendanceDate: '2024-12-31',
      createdAt: '2024-12-01',
      notes: 'Consistent performer with excellent attendance'
    },
    {
      id: 'ATT002',
      employeeId: 'EMP002',
      employeeName: 'Alice Johnson',
      employeePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      department: 'Design',
      month: 'December',
      year: 2024,
      presentDays: 20,
      absentDays: 1,
      leaveDays: 2,
      totalWorkingDays: 23,
      attendancePercentage: 87.0,
      lateArrivals: 3,
      earlyDepartures: 2,
      overtimeHours: 8,
      status: 'Good',
      lastAttendanceDate: '2024-12-30',
      createdAt: '2024-12-01',
      notes: 'Good attendance with occasional late arrivals'
    },
    {
      id: 'ATT003',
      employeeId: 'EMP003',
      employeeName: 'Bob Wilson',
      employeePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Human Resources',
      month: 'December',
      year: 2024,
      presentDays: 21,
      absentDays: 0,
      leaveDays: 2,
      totalWorkingDays: 23,
      attendancePercentage: 91.3,
      lateArrivals: 1,
      earlyDepartures: 0,
      overtimeHours: 12,
      status: 'Excellent',
      lastAttendanceDate: '2024-12-31',
      createdAt: '2024-12-01',
      notes: 'HR manager with excellent punctuality'
    },
    {
      id: 'ATT004',
      employeeId: 'EMP004',
      employeeName: 'Charlie Brown',
      employeePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      presentDays: 19,
      absentDays: 2,
      leaveDays: 2,
      totalWorkingDays: 23,
      attendancePercentage: 82.6,
      lateArrivals: 5,
      earlyDepartures: 3,
      overtimeHours: 20,
      status: 'Average',
      lastAttendanceDate: '2024-12-29',
      createdAt: '2024-12-01',
      notes: 'Senior engineer with high overtime but irregular attendance'
    },
    {
      id: 'ATT005',
      employeeId: 'EMP005',
      employeeName: 'Diana Prince',
      employeePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      month: 'December',
      year: 2024,
      presentDays: 18,
      absentDays: 3,
      leaveDays: 2,
      totalWorkingDays: 23,
      attendancePercentage: 78.3,
      lateArrivals: 4,
      earlyDepartures: 2,
      overtimeHours: 6,
      status: 'Average',
      lastAttendanceDate: '2024-12-28',
      createdAt: '2024-12-01',
      notes: 'Marketing manager with average attendance'
    },
    {
      id: 'ATT006',
      employeeId: 'EMP006',
      employeeName: 'Eve Wilson',
      employeePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      department: 'Sales',
      month: 'December',
      year: 2024,
      presentDays: 16,
      absentDays: 4,
      leaveDays: 3,
      totalWorkingDays: 23,
      attendancePercentage: 69.6,
      lateArrivals: 6,
      earlyDepartures: 4,
      overtimeHours: 3,
      status: 'Poor',
      lastAttendanceDate: '2024-12-27',
      createdAt: '2024-12-01',
      notes: 'Sales executive with poor attendance record'
    },
    {
      id: 'ATT007',
      employeeId: 'EMP007',
      employeeName: 'Frank Miller',
      employeePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      month: 'December',
      year: 2024,
      presentDays: 23,
      absentDays: 0,
      leaveDays: 0,
      totalWorkingDays: 23,
      attendancePercentage: 100.0,
      lateArrivals: 0,
      earlyDepartures: 0,
      overtimeHours: 25,
      status: 'Excellent',
      lastAttendanceDate: '2024-12-31',
      createdAt: '2024-12-01',
      notes: 'Lead developer with perfect attendance'
    },
    {
      id: 'ATT008',
      employeeId: 'EMP008',
      employeeName: 'Grace Lee',
      employeePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      month: 'December',
      year: 2024,
      presentDays: 20,
      absentDays: 1,
      leaveDays: 2,
      totalWorkingDays: 23,
      attendancePercentage: 87.0,
      lateArrivals: 2,
      earlyDepartures: 1,
      overtimeHours: 10,
      status: 'Good',
      lastAttendanceDate: '2024-12-30',
      createdAt: '2024-12-01',
      notes: 'Product manager with good attendance'
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

  addAttendance() {
    alert('Add Attendance functionality will be implemented here');
  }

  viewAttendance(attendance: any) {
    this.selectedAttendance = attendance;
  }

  closeModal() {
    this.selectedAttendance = null;
  }

  editAttendance(attendance: any) {
    alert(`Edit attendance: ${attendance.employeeName}`);
  }

  deleteAttendance(attendance: any) {
    if (confirm(`Are you sure you want to delete attendance record for ${attendance.employeeName}?`)) {
      alert(`Attendance record for ${attendance.employeeName} deleted successfully`);
    }
  }

  // Get filtered and sorted attendance records
  get filteredRecords() {
    let filtered = this.records.filter(record => {
      const matchesSearch = record.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesMonth = this.selectedMonth === 'All' || record.month === this.selectedMonth;
      const matchesYear = this.selectedYear === 'All' || record.year.toString() === this.selectedYear;
      const matchesStatus = this.selectedStatus === 'All' || record.status === this.selectedStatus;
      const matchesDepartment = this.selectedDepartment === 'All' || record.department === this.selectedDepartment;
      
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

  // Sort attendance records
  sortRecords(column: string) {
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
  getTotalPresentDays(): number {
    return this.records.reduce((sum, record) => sum + record.presentDays, 0);
  }

  getTotalAbsentDays(): number {
    return this.records.reduce((sum, record) => sum + record.absentDays, 0);
  }

  getTotalLeaveDays(): number {
    return this.records.reduce((sum, record) => sum + record.leaveDays, 0);
  }

  getTotalOvertimeHours(): number {
    return this.records.reduce((sum, record) => sum + record.overtimeHours, 0);
  }

  getAverageAttendancePercentage(): number {
    const total = this.records.reduce((sum, record) => sum + record.attendancePercentage, 0);
    return this.records.length > 0 ? total / this.records.length : 0;
  }

  getAttendanceByStatus() {
    return [
      { status: 'Excellent', count: this.records.filter(r => r.status === 'Excellent').length, color: '#10b981' },
      { status: 'Good', count: this.records.filter(r => r.status === 'Good').length, color: '#3b82f6' },
      { status: 'Average', count: this.records.filter(r => r.status === 'Average').length, color: '#f59e0b' },
      { status: 'Poor', count: this.records.filter(r => r.status === 'Poor').length, color: '#ef4444' }
    ];
  }

  getAttendanceByDepartment() {
    const distribution = this.records.reduce((acc, record) => {
      acc[record.department] = (acc[record.department] || 0) + 1;
      return acc;
    }, {} as any);
    
    return Object.entries(distribution).map(([department, count]) => ({
      department,
      count: count as number,
      percentage: ((count as number) / this.records.length) * 100
    }));
  }

  getTopPerformers() {
    return this.records
      .sort((a, b) => b.attendancePercentage - a.attendancePercentage)
      .slice(0, 5);
  }

  getAverageAttendanceByDepartment() {
    const departmentAttendance = this.records.reduce((acc, record) => {
      if (!acc[record.department]) {
        acc[record.department] = { total: 0, count: 0 };
      }
      acc[record.department].total += record.attendancePercentage;
      acc[record.department].count += 1;
      return acc;
    }, {} as any);

    return Object.entries(departmentAttendance).map(([department, data]: [string, any]) => ({
      department,
      averageAttendance: Math.round((data.total / data.count) * 10) / 10
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
    return Math.max(...this.getAttendanceByStatus().map(status => status.count));
  }

  getMaxAverageAttendance(): number {
    const averages = this.getAverageAttendanceByDepartment();
    return averages.length > 0 ? Math.max(...averages.map(avg => avg.averageAttendance)) : 100;
  }

  // Helper methods for template
  getTotalPresentDaysK(): number {
    return Math.round(this.getTotalPresentDays() / 1000);
  }

  getTotalAbsentDaysK(): number {
    return Math.round(this.getTotalAbsentDays() / 1000);
  }

  getTotalLeaveDaysK(): number {
    return Math.round(this.getTotalLeaveDays() / 1000);
  }

  getTotalOvertimeHoursK(): number {
    return Math.round(this.getTotalOvertimeHours() / 1000);
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

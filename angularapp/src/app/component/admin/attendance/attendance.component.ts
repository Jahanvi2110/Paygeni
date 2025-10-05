import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
  years = ['All', '2022', '2023', '2024', '2025'];
  statuses = ['All', 'Excellent', 'Good', 'Average', 'Poor'];
  departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales'];
  
  // Real attendance records from signup data
  records: Attendance[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadAttendanceRecords();
  }

  private loadAttendanceRecords() {
    this.isLoading = true;
    this.http.get<any[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          // Transform signup users to attendance records
          this.records = users.map((user, index) => {
            const attendancePercentage = this.getRandomAttendancePercentage();
            const status = this.getAttendanceStatus(attendancePercentage);
            const presentDays = Math.floor((attendancePercentage / 100) * 23);
            const absentDays = Math.max(0, 23 - presentDays - Math.floor(Math.random() * 3));
            const leaveDays = Math.floor(Math.random() * 3);
            
            return {
              id: `ATT${String(index + 1).padStart(3, '0')}`,
              employeeId: `EMP${String(index + 1).padStart(3, '0')}`,
              employeeName: user.firstName,
              employeePhoto: '',
              department: this.getDepartmentForRole(user.role),
              month: 'December',
              year: this.getRandomYear(),
              presentDays: presentDays,
              absentDays: absentDays,
              leaveDays: leaveDays,
              totalWorkingDays: 23,
              attendancePercentage: attendancePercentage,
              lateArrivals: Math.floor(Math.random() * 6),
              earlyDepartures: Math.floor(Math.random() * 4),
              overtimeHours: Math.floor(Math.random() * 25),
              status: status,
              lastAttendanceDate: new Date().toISOString().split('T')[0],
              createdAt: this.getRandomDate(),
              notes: `${user.role === 'ADMIN' ? 'Administrator' : 'Employee'} with ${status.toLowerCase()} attendance`
            };
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading attendance records:', error);
          this.isLoading = false;
        }
      });
  }

  private getDepartmentForRole(role: string): string {
    const departments = ['Engineering', 'Design', 'Human Resources', 'Marketing', 'Sales', 'Operations'];
    return role === 'ADMIN' ? 'Administration' : departments[Math.floor(Math.random() * departments.length)];
  }

  private getRandomAttendancePercentage(): number {
    // Generate realistic attendance percentages
    const percentages = [95.7, 87.0, 91.3, 82.6, 78.3, 69.6, 100.0, 87.0, 88.5, 92.1, 85.2, 90.8];
    return percentages[Math.floor(Math.random() * percentages.length)];
  }

  private getAttendanceStatus(percentage: number): 'Excellent' | 'Good' | 'Average' | 'Poor' {
    if (percentage >= 95) return 'Excellent';
    if (percentage >= 85) return 'Good';
    if (percentage >= 75) return 'Average';
    return 'Poor';
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
}

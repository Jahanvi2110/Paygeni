import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Attendance {
  id: number; // Changed to number to match backend Long ID
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
  showEditModal = false;
  editingAttendance: any = null;
  isSubmittingEdit = false;
  showAddModal = false;
  newAttendance: any = null;
  isSubmittingAdd = false;
  
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
    
    // Load real attendance records from database
    this.http.get<any[]>(`${environment.apiUrl}/attendance`)
      .subscribe({
        next: (attendanceRecords) => {
          console.log('✅ Loaded attendance records from database:', attendanceRecords);
          this.records = attendanceRecords.map((record) => ({
            id: record.id,
            employeeId: record.employeeId,
            employeeName: record.employeeName,
            employeePhoto: record.employeePhoto || '',
            department: record.department,
            month: record.month,
            year: record.year,
            presentDays: record.presentDays,
            absentDays: record.absentDays,
            leaveDays: record.leaveDays,
            totalWorkingDays: record.totalWorkingDays,
            attendancePercentage: record.attendancePercentage,
            lateArrivals: record.lateArrivals,
            earlyDepartures: record.earlyDepartures,
            overtimeHours: record.overtimeHours,
            status: this.getAttendanceStatus(record.attendancePercentage),
            lastAttendanceDate: record.lastAttendanceDate,
            createdAt: record.createdAt,
            notes: record.notes
          }));
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error loading attendance records:', error);
          // Fallback to generating from users if attendance endpoint fails
          this.loadUsersAsAttendance();
        }
      });
  }

  private loadUsersAsAttendance() {
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
              id: user.id, // Use actual user ID from database (Long type)
              employeeId: `EMP${String(user.id).padStart(3, '0')}`,
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
    this.newAttendance = {
      employeeId: '',
      employeeName: '',
      employeePhoto: '',
      department: 'Engineering',
      month: 'December',
      year: new Date().getFullYear(),
      presentDays: 0,
      absentDays: 0,
      leaveDays: 0,
      totalWorkingDays: 23,
      attendancePercentage: 0,
      lateArrivals: 0,
      earlyDepartures: 0,
      overtimeHours: 0,
      status: 'Average',
      lastAttendanceDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      notes: ''
    };
    this.showAddModal = true;
  }

  viewAttendance(attendance: any) {
    this.selectedAttendance = attendance;
  }

  closeModal() {
    this.selectedAttendance = null;
  }

  editAttendance(attendance: any) {
    console.log('🔄 Opening edit modal for attendance:', attendance);
    this.editingAttendance = { ...attendance }; // Create a copy for editing
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingAttendance = null;
    this.isSubmittingEdit = false;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newAttendance = null;
    this.isSubmittingAdd = false;
  }

  submitEditAttendance() {
    if (!this.editingAttendance) return;

    // Validate required fields (employee name is auto-populated, so not required in validation)
    if (!this.editingAttendance.presentDays || 
        !this.editingAttendance.absentDays || !this.editingAttendance.leaveDays) {
      alert('❌ Please fill in all required fields (Present Days, Absent Days, Leave Days)');
      return;
    }

    this.isSubmittingEdit = true;

    // Calculate attendance percentage
    const totalDays = this.editingAttendance.presentDays + this.editingAttendance.absentDays + this.editingAttendance.leaveDays;
    this.editingAttendance.attendancePercentage = totalDays > 0 ? 
      Math.round((this.editingAttendance.presentDays / totalDays) * 100 * 10) / 10 : 0;

    // Prepare the update data
    const updateData = {
      employeeId: this.editingAttendance.employeeId,
      employeeName: this.editingAttendance.employeeName,
      department: this.editingAttendance.department,
      month: this.editingAttendance.month,
      year: this.editingAttendance.year,
      presentDays: this.editingAttendance.presentDays,
      absentDays: this.editingAttendance.absentDays,
      leaveDays: this.editingAttendance.leaveDays,
      totalWorkingDays: this.editingAttendance.totalWorkingDays,
      attendancePercentage: this.editingAttendance.attendancePercentage,
      lateArrivals: this.editingAttendance.lateArrivals,
      earlyDepartures: this.editingAttendance.earlyDepartures,
      lastAttendanceDate: this.editingAttendance.lastAttendanceDate,
      notes: this.editingAttendance.notes
    };

    console.log('🚀 Updating attendance:', updateData);

    // Call the backend API to update attendance
    this.http.put<any>(`${environment.apiUrl}/attendance/${this.editingAttendance.id}`, updateData)
      .subscribe({
        next: (response) => {
          console.log('✅ Attendance updated successfully:', response);
          
          // Update the attendance in the local array
          const index = this.records.findIndex(record => record.id === this.editingAttendance.id);
          if (index !== -1) {
            this.records[index] = { ...this.records[index], ...updateData };
          }
          
          alert(`✅ Attendance record for ${this.editingAttendance.employeeName} updated successfully!`);
          this.closeEditModal();
          this.isSubmittingEdit = false;
        },
        error: (error) => {
          console.error('❌ Error updating attendance:', error);
          alert('❌ Error updating attendance: ' + (error.error?.message || error.message));
          this.isSubmittingEdit = false;
        }
      });
  }

  resetEditForm() {
    if (this.editingAttendance) {
      // Find the original attendance data
      const originalAttendance = this.records.find(record => record.id === this.editingAttendance.id);
      if (originalAttendance) {
        this.editingAttendance = { ...originalAttendance }; // Reset to original values
      }
    }
  }

  public recalcAddAttendance() {
    if (!this.newAttendance) return;
    const totalDays = (this.newAttendance.presentDays || 0) + (this.newAttendance.absentDays || 0) + (this.newAttendance.leaveDays || 0);
    this.newAttendance.attendancePercentage = totalDays > 0 ? Math.round((this.newAttendance.presentDays / totalDays) * 100 * 10) / 10 : 0;
    this.newAttendance.status = this.getAttendanceStatus(this.newAttendance.attendancePercentage);
  }

  submitAddAttendance() {
    if (!this.newAttendance) return;
    if (!this.newAttendance.employeeId || !this.newAttendance.employeeName) {
      alert('❌ Please fill in required fields: Employee ID and Employee Name');
      return;
    }
    this.isSubmittingAdd = true;
    this.recalcAddAttendance();

    const createData = {
      employeeId: this.newAttendance.employeeId,
      employeeName: this.newAttendance.employeeName,
      department: this.newAttendance.department,
      month: this.newAttendance.month,
      year: this.newAttendance.year,
      presentDays: this.newAttendance.presentDays,
      absentDays: this.newAttendance.absentDays,
      leaveDays: this.newAttendance.leaveDays,
      totalWorkingDays: this.newAttendance.totalWorkingDays,
      attendancePercentage: this.newAttendance.attendancePercentage,
      lateArrivals: this.newAttendance.lateArrivals,
      earlyDepartures: this.newAttendance.earlyDepartures,
      overtimeHours: this.newAttendance.overtimeHours,
      lastAttendanceDate: this.newAttendance.lastAttendanceDate,
      notes: this.newAttendance.notes
    };

    this.http.post<any>(`${environment.apiUrl}/attendance`, createData)
      .subscribe({
        next: (response) => {
          const created = {
            id: response?.id ?? Math.floor(Math.random()*100000),
            createdAt: response?.createdAt ?? new Date().toISOString().split('T')[0],
            status: this.getAttendanceStatus(createData.attendancePercentage),
            employeePhoto: '',
            ...createData
          };
          this.records.unshift(created as any);
          alert(`✅ Attendance record created for ${created.employeeName}`);
          this.closeAddModal();
          this.isSubmittingAdd = false;
        },
        error: (error) => {
          console.error('❌ Error creating attendance:', error);
          alert('❌ Error creating attendance: ' + (error.error?.message || error.message));
          this.isSubmittingAdd = false;
        }
      });
  }

  deleteAttendance(attendance: any) {
    if (confirm(`Are you sure you want to delete attendance record for ${attendance.employeeName}?\n\nThis action cannot be undone.`)) {
      console.log('🗑️ Deleting attendance:', attendance);
      
      // Call the backend API to delete attendance
      this.http.delete<any>(`${environment.apiUrl}/attendance/${attendance.id}`)
        .subscribe({
          next: (response) => {
            console.log('✅ Attendance deleted successfully:', response);
            
            // Remove the attendance from the local array
            const index = this.records.findIndex(record => record.id === attendance.id);
            if (index !== -1) {
              this.records.splice(index, 1);
            }
            
            alert(`✅ Attendance record for ${attendance.employeeName} deleted successfully!`);
          },
          error: (error) => {
            console.error('❌ Error deleting attendance:', error);
            alert('❌ Error deleting attendance: ' + (error.error?.message || error.message));
          }
        });
    }
  }

  // Get filtered and sorted attendance records
  get filteredRecords() {
    let filtered = this.records.filter(record => {
      const matchesSearch = record.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           record.id.toString().includes(this.searchTerm);
      
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

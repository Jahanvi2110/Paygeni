package com.example.springapp.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private String employeeName;

    private String employeePhoto;
    private String department;
    private String month; // e.g., "Sep 2025"
    private Integer year;
    private Integer presentDays;
    private Integer present; // Additional field for database compatibility
    private Integer absentDays;
    private Integer leaveDays;
    private Integer totalWorkingDays;
    private Double attendancePercentage;
    private Integer lateArrivals;
    private Integer earlyDepartures;
    private Integer overtimeHours;
    private String lastAttendanceDate;
    private LocalDate createdAt;
    private String notes;
    
    // Additional fields for daily attendance tracking
    private LocalDate date;
    private String status; // Present, Absent, Late, etc.
    private String checkInTime;
    private String checkOutTime;
    private Double hoursWorked;

    // ✅ Link attendance to an employee
    @ManyToOne
    @JoinColumn(name = "employee_ref_id", referencedColumnName = "id")
    private Employee employee;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    
    public String getEmployeePhoto() { return employeePhoto; }
    public void setEmployeePhoto(String employeePhoto) { this.employeePhoto = employeePhoto; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    
    public Integer getPresentDays() { return presentDays; }
    public void setPresentDays(Integer presentDays) { this.presentDays = presentDays; }
    
    public Integer getPresent() { return present; }
    public void setPresent(Integer present) { this.present = present; }
    
    public Integer getAbsentDays() { return absentDays; }
    public void setAbsentDays(Integer absentDays) { this.absentDays = absentDays; }
    
    public Integer getLeaveDays() { return leaveDays; }
    public void setLeaveDays(Integer leaveDays) { this.leaveDays = leaveDays; }
    
    public Integer getTotalWorkingDays() { return totalWorkingDays; }
    public void setTotalWorkingDays(Integer totalWorkingDays) { this.totalWorkingDays = totalWorkingDays; }
    
    public Double getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(Double attendancePercentage) { this.attendancePercentage = attendancePercentage; }
    
    public Integer getLateArrivals() { return lateArrivals; }
    public void setLateArrivals(Integer lateArrivals) { this.lateArrivals = lateArrivals; }
    
    public Integer getEarlyDepartures() { return earlyDepartures; }
    public void setEarlyDepartures(Integer earlyDepartures) { this.earlyDepartures = earlyDepartures; }
    
    public Integer getOvertimeHours() { return overtimeHours; }
    public void setOvertimeHours(Integer overtimeHours) { this.overtimeHours = overtimeHours; }
    
    public String getLastAttendanceDate() { return lastAttendanceDate; }
    public void setLastAttendanceDate(String lastAttendanceDate) { this.lastAttendanceDate = lastAttendanceDate; }
    
    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getCheckInTime() { return checkInTime; }
    public void setCheckInTime(String checkInTime) { this.checkInTime = checkInTime; }
    
    public String getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; }
    
    public Double getHoursWorked() { return hoursWorked; }
    public void setHoursWorked(Double hoursWorked) { this.hoursWorked = hoursWorked; }
    
    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
}

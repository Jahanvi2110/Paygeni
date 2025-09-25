package com.example.springapp.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Data
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
    private Integer absentDays;
    private Integer leaveDays;
    private Integer totalWorkingDays;
    private Double attendancePercentage;
    private Integer lateArrivals;
    private Integer earlyDepartures;
    private String lastAttendanceDate;
    private LocalDate createdAt;
    private String notes;

    // ✅ Link attendance to an employee
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
}

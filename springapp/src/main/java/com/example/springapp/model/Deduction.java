package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "deductions")
public class Deduction {
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
    private Double tax;
    private Double pf;
    private Double other;
    private Double totalDeduction;
    private String deductionType; // TAX, PF, INSURANCE, OTHER
    private String status; // PENDING, APPROVED, REJECTED
    private String description;
    private LocalDate createdAt;
    private String approvedBy;
    private String notes;

    // ✅ Link each deduction to one payroll
    @ManyToOne
    @JoinColumn(name = "payroll_id")
    private Payroll payroll;

    // ✅ Link deduction to an employee
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
}

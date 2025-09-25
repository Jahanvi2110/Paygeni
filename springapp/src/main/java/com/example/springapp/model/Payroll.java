package com.example.springapp.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "payrolls")
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String payDate; // Use String to match frontend

    @Column(nullable = false)
    private Double basicSalary;

    @Column(nullable = false)
    private Double totalEarnings;

    @Column(nullable = false)
    private Double totalDeductions;

    @Column(nullable = false)
    private Double netSalary;

    @Column(nullable = false)
    private Long employeeId; // Link to employee ID

    private String employeeName;
    private String department;
    private String payPeriod; // e.g., "Sep 2025"
    private String status; // PENDING, PROCESSED, PAID
    private String paymentMethod; // BANK_TRANSFER, CHECK, CASH
    private LocalDate processedDate;
    private String processedBy;
    private String notes;

    // ✅ Add relation to Employee
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
}

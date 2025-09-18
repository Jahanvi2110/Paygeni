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

    private LocalDate payDate;
    private double basicSalary;
    private double totalEarnings;
    private double totalDeductions;
    private double netSalary;

    // ✅ Add relation to Employee
    @ManyToOne
    @JoinColumn(name = "employee_id") // foreign key in payrolls table
    private Employee employee;
}

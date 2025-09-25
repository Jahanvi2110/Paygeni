package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "salary_components")
public class SalaryComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String componentName; // HRA, Bonus, Allowance, etc.

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Long payrollId; // Link to payroll ID

    private String componentType; // EARNING, DEDUCTION
    private String description;
    private Boolean isTaxable; // true for taxable components
    private String status; // ACTIVE, INACTIVE

    @ManyToOne
    @JoinColumn(name = "payroll_id", referencedColumnName = "id")
    private Payroll payroll;
}

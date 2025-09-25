package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "deductions")
public class Deduction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Tax, PF, Insurance
    private double amount;

    // ✅ Link each deduction to one payroll
    @ManyToOne
    @JoinColumn(name = "payroll_id")
    private Payroll payroll;
}

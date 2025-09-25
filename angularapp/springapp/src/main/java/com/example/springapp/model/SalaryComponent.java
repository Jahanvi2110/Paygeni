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

    private String componentName;
     // HRA, Bonus, etc.
    private double amount;
    @ManyToOne
@JoinColumn(name = "payroll_id")
private Payroll payroll;


    

    

}

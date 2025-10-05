package com.example.springapp.model;

import jakarta.persistence.*;

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
    @JoinColumn(name = "payroll_ref_id", referencedColumnName = "id")
    private Payroll payroll;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getComponentName() { return componentName; }
    public void setComponentName(String componentName) { this.componentName = componentName; }
    
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    
    public Long getPayrollId() { return payrollId; }
    public void setPayrollId(Long payrollId) { this.payrollId = payrollId; }
    
    public String getComponentType() { return componentType; }
    public void setComponentType(String componentType) { this.componentType = componentType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getIsTaxable() { return isTaxable; }
    public void setIsTaxable(Boolean isTaxable) { this.isTaxable = isTaxable; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Payroll getPayroll() { return payroll; }
    public void setPayroll(Payroll payroll) { this.payroll = payroll; }
}

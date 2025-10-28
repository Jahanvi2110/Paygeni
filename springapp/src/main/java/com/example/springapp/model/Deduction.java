package com.example.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

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
    private Double esi;
    private Double professionalTax;
    private Double loanDeduction;
    private Double advanceDeduction;
    private Double other;
    private Double totalDeduction;
    private Double grossSalary;
    private Double netSalary;
    private String deductionType; // TAX, PF, INSURANCE, OTHER
    private String status; // PENDING, APPROVED, REJECTED
    private String description;
    private LocalDate createdAt;
    private String approvedBy;
    private String notes;

    // ✅ Link each deduction to one payroll
    @ManyToOne
    @JoinColumn(name = "payroll_ref_id")
    private Payroll payroll;

    // ✅ Link deduction to an employee
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
    
    public Double getTax() { return tax; }
    public void setTax(Double tax) { this.tax = tax; }
    
    public Double getPf() { return pf; }
    public void setPf(Double pf) { this.pf = pf; }
    
    public Double getEsi() { return esi; }
    public void setEsi(Double esi) { this.esi = esi; }
    
    public Double getProfessionalTax() { return professionalTax; }
    public void setProfessionalTax(Double professionalTax) { this.professionalTax = professionalTax; }
    
    public Double getLoanDeduction() { return loanDeduction; }
    public void setLoanDeduction(Double loanDeduction) { this.loanDeduction = loanDeduction; }
    
    public Double getAdvanceDeduction() { return advanceDeduction; }
    public void setAdvanceDeduction(Double advanceDeduction) { this.advanceDeduction = advanceDeduction; }
    
    public Double getOther() { return other; }
    public void setOther(Double other) { this.other = other; }
    
    public Double getGrossSalary() { return grossSalary; }
    public void setGrossSalary(Double grossSalary) { this.grossSalary = grossSalary; }
    
    public Double getNetSalary() { return netSalary; }
    public void setNetSalary(Double netSalary) { this.netSalary = netSalary; }
    
    public Double getTotalDeduction() { return totalDeduction; }
    public void setTotalDeduction(Double totalDeduction) { this.totalDeduction = totalDeduction; }
    
    public String getDeductionType() { return deductionType; }
    public void setDeductionType(String deductionType) { this.deductionType = deductionType; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
    
    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Payroll getPayroll() { return payroll; }
    public void setPayroll(Payroll payroll) { this.payroll = payroll; }
    
    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
    
    // Additional methods for compatibility
    public String getDeductionName() { return description; }
    public void setDeductionName(String deductionName) { this.description = deductionName; }
    
    public Double getAmount() { return totalDeduction; }
    public void setAmount(Double amount) { this.totalDeduction = amount; }
}

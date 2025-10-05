package com.example.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "payrolls")
public class Payroll {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "payroll_id", unique = true, nullable = false)
    private String payrollId; // Unique payroll identifier
    
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;
    
    @Column(name = "employee_name", nullable = false)
    private String employeeName;
    
    @Column(name = "pay_period", nullable = false)
    private String payPeriod; // e.g., "December 2024"
    
    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;
    
    @Column(name = "allowances")
    private Double allowances = 0.0;
    
    @Column(name = "overtime")
    private Double overtime = 0.0;
    
    @Column(name = "bonus")
    private Double bonus = 0.0;
    
    @Column(name = "total_earnings", nullable = false)
    private Double totalEarnings;
    
    @Column(name = "tax_deduction")
    private Double taxDeduction = 0.0;
    
    @Column(name = "insurance_deduction")
    private Double insuranceDeduction = 0.0;
    
    @Column(name = "loan_deduction")
    private Double loanDeduction = 0.0;
    
    @Column(name = "other_deductions")
    private Double otherDeductions = 0.0;
    
    @Column(name = "attendance_deduction")
    private Double attendanceDeduction = 0.0;
    
    @Column(name = "leave_deduction")
    private Double leaveDeduction = 0.0;
    
    @Column(name = "total_deductions", nullable = false)
    private Double totalDeductions;
    
    @Column(name = "net_salary", nullable = false)
    private Double netSalary;
    
    @Column(name = "pay_date")
    private LocalDate payDate;
    
    @Column(name = "status")
    private String status = "PENDING"; // PENDING, PAID, CANCELLED
    
    @Column(name = "payment_method")
    private String paymentMethod = "BANK_TRANSFER"; // BANK_TRANSFER, CASH, CHEQUE
    
    @Column(name = "processed_date")
    private LocalDate processedDate;
    
    @Column(name = "processed_by")
    private String processedBy;
    
    @Column(name = "notes")
    private String notes;
    
    // Constructors
    public Payroll() {}
    
    public Payroll(Long employeeId, String employeeName, String payPeriod, 
                   Double basicSalary, Double totalEarnings, Double totalDeductions, 
                   Double netSalary) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.payPeriod = payPeriod;
        this.basicSalary = basicSalary;
        this.totalEarnings = totalEarnings;
        this.totalDeductions = totalDeductions;
        this.netSalary = netSalary;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPayrollId() { return payrollId; }
    public void setPayrollId(String payrollId) { this.payrollId = payrollId; }
    
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    
    public String getPayPeriod() { return payPeriod; }
    public void setPayPeriod(String payPeriod) { this.payPeriod = payPeriod; }
    
    public Double getBasicSalary() { return basicSalary; }
    public void setBasicSalary(Double basicSalary) { this.basicSalary = basicSalary; }
    
    public Double getAllowances() { return allowances; }
    public void setAllowances(Double allowances) { this.allowances = allowances; }
    
    public Double getOvertime() { return overtime; }
    public void setOvertime(Double overtime) { this.overtime = overtime; }
    
    public Double getBonus() { return bonus; }
    public void setBonus(Double bonus) { this.bonus = bonus; }
    
    public Double getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(Double totalEarnings) { this.totalEarnings = totalEarnings; }
    
    public Double getTaxDeduction() { return taxDeduction; }
    public void setTaxDeduction(Double taxDeduction) { this.taxDeduction = taxDeduction; }
    
    public Double getInsuranceDeduction() { return insuranceDeduction; }
    public void setInsuranceDeduction(Double insuranceDeduction) { this.insuranceDeduction = insuranceDeduction; }
    
    public Double getLoanDeduction() { return loanDeduction; }
    public void setLoanDeduction(Double loanDeduction) { this.loanDeduction = loanDeduction; }
    
    public Double getOtherDeductions() { return otherDeductions; }
    public void setOtherDeductions(Double otherDeductions) { this.otherDeductions = otherDeductions; }
    
    public Double getAttendanceDeduction() { return attendanceDeduction; }
    public void setAttendanceDeduction(Double attendanceDeduction) { this.attendanceDeduction = attendanceDeduction; }
    
    public Double getLeaveDeduction() { return leaveDeduction; }
    public void setLeaveDeduction(Double leaveDeduction) { this.leaveDeduction = leaveDeduction; }
    
    public Double getTotalDeductions() { return totalDeductions; }
    public void setTotalDeductions(Double totalDeductions) { this.totalDeductions = totalDeductions; }
    
    public Double getNetSalary() { return netSalary; }
    public void setNetSalary(Double netSalary) { this.netSalary = netSalary; }
    
    public LocalDate getPayDate() { return payDate; }
    public void setPayDate(LocalDate payDate) { this.payDate = payDate; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public LocalDate getProcessedDate() { return processedDate; }
    public void setProcessedDate(LocalDate processedDate) { this.processedDate = processedDate; }
    
    public String getProcessedBy() { return processedBy; }
    public void setProcessedBy(String processedBy) { this.processedBy = processedBy; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
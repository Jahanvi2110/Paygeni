package com.example.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "advance_requests")
public class AdvanceRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;
    
    @Column(name = "employee_name", nullable = false)
    private String employeeName;
    
    @Column(name = "request_amount", nullable = false)
    private Double requestAmount;
    
    @Column(name = "reason", nullable = false)
    private String reason;
    
    @Column(name = "status", nullable = false)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED, PAID
    
    @Column(name = "requested_date", nullable = false)
    private LocalDate requestedDate;
    
    @Column(name = "approved_amount")
    private Double approvedAmount;
    
    @Column(name = "approved_by")
    private String approvedBy;
    
    @Column(name = "approved_date")
    private LocalDate approvedDate;
    
    @Column(name = "rejection_reason")
    private String rejectionReason;
    
    @Column(name = "repayment_plan")
    private String repaymentPlan; // MONTHLY, QUARTERLY, YEARLY
    
    @Column(name = "installment_amount")
    private Double installmentAmount;
    
    @Column(name = "total_installments")
    private Integer totalInstallments;
    
    @Column(name = "paid_installments")
    private Integer paidInstallments = 0;
    
    @Column(name = "remaining_amount")
    private Double remainingAmount;
    
    @Column(name = "notes")
    private String notes;
    
    // Constructors
    public AdvanceRequest() {}
    
    public AdvanceRequest(Long employeeId, String employeeName, Double requestAmount, 
                         String reason) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.requestAmount = requestAmount;
        this.reason = reason;
        this.requestedDate = LocalDate.now();
        this.remainingAmount = requestAmount;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    
    public Double getRequestAmount() { return requestAmount; }
    public void setRequestAmount(Double requestAmount) { this.requestAmount = requestAmount; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDate getRequestedDate() { return requestedDate; }
    public void setRequestedDate(LocalDate requestedDate) { this.requestedDate = requestedDate; }
    
    public Double getApprovedAmount() { return approvedAmount; }
    public void setApprovedAmount(Double approvedAmount) { this.approvedAmount = approvedAmount; }
    
    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }
    
    public LocalDate getApprovedDate() { return approvedDate; }
    public void setApprovedDate(LocalDate approvedDate) { this.approvedDate = approvedDate; }
    
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    
    public String getRepaymentPlan() { return repaymentPlan; }
    public void setRepaymentPlan(String repaymentPlan) { this.repaymentPlan = repaymentPlan; }
    
    public Double getInstallmentAmount() { return installmentAmount; }
    public void setInstallmentAmount(Double installmentAmount) { this.installmentAmount = installmentAmount; }
    
    public Integer getTotalInstallments() { return totalInstallments; }
    public void setTotalInstallments(Integer totalInstallments) { this.totalInstallments = totalInstallments; }
    
    public Integer getPaidInstallments() { return paidInstallments; }
    public void setPaidInstallments(Integer paidInstallments) { this.paidInstallments = paidInstallments; }
    
    public Double getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(Double remainingAmount) { this.remainingAmount = remainingAmount; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    // Additional methods for compatibility
    public Double getAmount() { return requestAmount; }
    public void setAmount(Double amount) { this.requestAmount = amount; }
    
    public LocalDate getApprovalDate() { return approvedDate; }
    public void setApprovalDate(LocalDate approvalDate) { this.approvedDate = approvalDate; }
}

package com.example.springapp.service;

import com.example.springapp.model.AdvanceRequest;
import com.example.springapp.model.User;
import com.example.springapp.repository.AdvanceRequestRepository;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AdvanceRequestService {
    
    @Autowired
    private AdvanceRequestRepository advanceRequestRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<AdvanceRequest> getAdvanceRequestsByEmployeeId(Long employeeId) {
        return advanceRequestRepository.findByEmployeeIdOrderByRequestedDateDesc(employeeId);
    }
    
    public AdvanceRequest createAdvanceRequest(Long employeeId, Double requestAmount, 
                                             String reason) {
        Optional<User> userOpt = userRepository.findById(employeeId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }
        
        User user = userOpt.get();
        
        AdvanceRequest advanceRequest = new AdvanceRequest();
        advanceRequest.setEmployeeId(employeeId);
        advanceRequest.setEmployeeName(user.getFirstName());
        advanceRequest.setRequestAmount(requestAmount);
        advanceRequest.setReason(reason);
        advanceRequest.setStatus("PENDING");
        advanceRequest.setRequestedDate(LocalDate.now());
        advanceRequest.setRemainingAmount(requestAmount);
        
        return advanceRequestRepository.save(advanceRequest);
    }
    
    public AdvanceRequest updateAdvanceRequestStatus(Long advanceRequestId, String status, 
                                                   String approvedBy, Double approvedAmount,
                                                   String repaymentPlan, Integer totalInstallments,
                                                   String rejectionReason) {
        Optional<AdvanceRequest> advanceRequestOpt = advanceRequestRepository.findById(advanceRequestId);
        if (advanceRequestOpt.isEmpty()) {
            throw new RuntimeException("Advance request not found");
        }
        
        AdvanceRequest advanceRequest = advanceRequestOpt.get();
        advanceRequest.setStatus(status);
        advanceRequest.setApprovedBy(approvedBy);
        advanceRequest.setApprovedDate(LocalDate.now());
        
        if ("APPROVED".equals(status)) {
            advanceRequest.setApprovedAmount(approvedAmount);
            advanceRequest.setRepaymentPlan(repaymentPlan);
            advanceRequest.setTotalInstallments(totalInstallments);
            advanceRequest.setRemainingAmount(approvedAmount);
            
            // Calculate installment amount
            if (totalInstallments > 0) {
                Double installmentAmount = approvedAmount / totalInstallments;
                advanceRequest.setInstallmentAmount(installmentAmount);
            }
        } else if ("REJECTED".equals(status) && rejectionReason != null) {
            advanceRequest.setRejectionReason(rejectionReason);
        }
        
        return advanceRequestRepository.save(advanceRequest);
    }
    
    public AdvanceRequest processInstallmentPayment(Long advanceRequestId) {
        Optional<AdvanceRequest> advanceRequestOpt = advanceRequestRepository.findById(advanceRequestId);
        if (advanceRequestOpt.isEmpty()) {
            throw new RuntimeException("Advance request not found");
        }
        
        AdvanceRequest advanceRequest = advanceRequestOpt.get();
        
        if (!"APPROVED".equals(advanceRequest.getStatus())) {
            throw new RuntimeException("Advance request is not approved");
        }
        
        // Process installment payment
        Integer paidInstallments = advanceRequest.getPaidInstallments() + 1;
        advanceRequest.setPaidInstallments(paidInstallments);
        
        // Calculate remaining amount
        Double remainingAmount = advanceRequest.getRemainingAmount() - advanceRequest.getInstallmentAmount();
        advanceRequest.setRemainingAmount(Math.max(0, remainingAmount));
        
        // Check if fully paid
        if (remainingAmount <= 0) {
            advanceRequest.setStatus("PAID");
        }
        
        return advanceRequestRepository.save(advanceRequest);
    }
    
    public List<AdvanceRequest> getPendingAdvanceRequests() {
        return advanceRequestRepository.findByStatus("PENDING");
    }
    
    public List<AdvanceRequest> getAdvanceRequestsByStatus(String status) {
        return advanceRequestRepository.findByStatus(status);
    }
    
    public List<AdvanceRequest> getActiveAdvanceRequests(Long employeeId) {
        return advanceRequestRepository.findByEmployeeIdAndStatus(employeeId, "APPROVED");
    }
    
    public Double getTotalOutstandingAmount(Long employeeId) {
        List<AdvanceRequest> activeRequests = advanceRequestRepository.findByStatusAndRemainingAmountGreaterThan("APPROVED", 0.0);
        return activeRequests.stream()
                .filter(req -> req.getEmployeeId().equals(employeeId))
                .mapToDouble(AdvanceRequest::getRemainingAmount)
                .sum();
    }
    
    public Optional<AdvanceRequest> getAdvanceRequestById(Long id) {
        return advanceRequestRepository.findById(id);
    }
    
    public void deleteAdvanceRequest(Long id) {
        advanceRequestRepository.deleteById(id);
    }
}

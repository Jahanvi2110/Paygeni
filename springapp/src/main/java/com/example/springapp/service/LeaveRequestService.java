package com.example.springapp.service;

import com.example.springapp.model.LeaveRequest;
import com.example.springapp.model.User;
import com.example.springapp.repository.LeaveRequestRepository;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {
    
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeIdOrderByAppliedDateDesc(employeeId);
    }
    
    public LeaveRequest createLeaveRequest(Long employeeId, String leaveType, 
                                         LocalDate startDate, LocalDate endDate, 
                                         String reason) {
        Optional<User> userOpt = userRepository.findById(employeeId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }
        
        User user = userOpt.get();
        
        // Calculate total days
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployeeId(employeeId);
        leaveRequest.setEmployeeName(user.getFirstName());
        leaveRequest.setLeaveType(leaveType);
        leaveRequest.setStartDate(startDate);
        leaveRequest.setEndDate(endDate);
        leaveRequest.setTotalDays((int) totalDays);
        leaveRequest.setReason(reason);
        leaveRequest.setStatus("PENDING");
        leaveRequest.setAppliedDate(LocalDate.now());
        
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public LeaveRequest updateLeaveRequestStatus(Long leaveRequestId, String status, 
                                               String approvedBy, String rejectionReason) {
        Optional<LeaveRequest> leaveRequestOpt = leaveRequestRepository.findById(leaveRequestId);
        if (leaveRequestOpt.isEmpty()) {
            throw new RuntimeException("Leave request not found");
        }
        
        LeaveRequest leaveRequest = leaveRequestOpt.get();
        leaveRequest.setStatus(status);
        leaveRequest.setApprovedBy(approvedBy);
        leaveRequest.setApprovedDate(LocalDate.now());
        
        if ("REJECTED".equals(status) && rejectionReason != null) {
            leaveRequest.setRejectionReason(rejectionReason);
        }
        
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public List<LeaveRequest> getPendingLeaveRequests() {
        return leaveRequestRepository.findByStatus("PENDING");
    }
    
    public List<LeaveRequest> getLeaveRequestsByStatus(String status) {
        return leaveRequestRepository.findByStatus(status);
    }
    
    public List<LeaveRequest> getLeaveRequestsByEmployeeAndStatus(Long employeeId, String status) {
        return leaveRequestRepository.findByEmployeeIdAndStatus(employeeId, status);
    }
    
    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }
    
    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }
}

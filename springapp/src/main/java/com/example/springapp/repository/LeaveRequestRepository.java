package com.example.springapp.repository;

import com.example.springapp.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    
    List<LeaveRequest> findByEmployeeIdOrderByAppliedDateDesc(Long employeeId);
    
    List<LeaveRequest> findByStatus(String status);
    
    List<LeaveRequest> findByLeaveType(String leaveType);
    
    List<LeaveRequest> findByEmployeeIdAndStatus(Long employeeId, String status);
}
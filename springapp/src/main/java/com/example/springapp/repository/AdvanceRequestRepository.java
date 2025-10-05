package com.example.springapp.repository;

import com.example.springapp.model.AdvanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdvanceRequestRepository extends JpaRepository<AdvanceRequest, Long> {
    
    List<AdvanceRequest> findByEmployeeId(Long employeeId);
    
    List<AdvanceRequest> findByEmployeeIdOrderByRequestedDateDesc(Long employeeId);
    
    List<AdvanceRequest> findByStatus(String status);
    
    List<AdvanceRequest> findByEmployeeIdAndStatus(Long employeeId, String status);
    
    List<AdvanceRequest> findByStatusAndRemainingAmountGreaterThan(String status, Double amount);
}

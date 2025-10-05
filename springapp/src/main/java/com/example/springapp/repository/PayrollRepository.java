package com.example.springapp.repository;

import com.example.springapp.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    
    List<Payroll> findByEmployeeId(Long employeeId);
    
    List<Payroll> findByEmployeeIdOrderByPayPeriodDesc(Long employeeId);
    
    Optional<Payroll> findByEmployeeIdAndPayPeriod(Long employeeId, String payPeriod);
    
    List<Payroll> findByStatus(String status);
    
    List<Payroll> findByPayPeriod(String payPeriod);
}
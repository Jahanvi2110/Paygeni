package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.springapp.model.SalaryComponent;

public interface SalaryComponentRepository extends JpaRepository<SalaryComponent, Long> {
    List<SalaryComponent> findByPayrollId(Long payrollId);
}

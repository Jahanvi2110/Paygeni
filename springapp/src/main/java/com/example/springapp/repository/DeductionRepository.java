package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.springapp.model.Deduction;

public interface DeductionRepository extends JpaRepository<Deduction, Long> {
    List<Deduction> findByPayrollId(Long payrollId);
}

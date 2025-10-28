package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Deduction;
import com.example.springapp.model.Payroll;
import com.example.springapp.repository.DeductionRepository;
import com.example.springapp.repository.PayrollRepository;

@Service
public class DeductionService {
    private final DeductionRepository deductionRepo;
    private final PayrollRepository payrollRepo;

    public DeductionService(DeductionRepository deductionRepo, PayrollRepository payrollRepo) {
        this.deductionRepo = deductionRepo;
        this.payrollRepo = payrollRepo;
    }

    public List<Deduction> getAllDeductions() {
        return deductionRepo.findAll();
    }

    public Optional<Deduction> getDeductionById(Long id) {
        return deductionRepo.findById(id);
    }

    public Deduction createDeduction(Deduction deduction) {
        return deductionRepo.save(deduction);
    }

    public Deduction updateDeduction(Deduction deduction) {
        return deductionRepo.save(deduction);
    }

    // ✅ Link deduction with payroll
    public Deduction linkDeductionToPayroll(Long deductionId, Long payrollId) {
        Deduction deduction = deductionRepo.findById(deductionId)
                .orElseThrow(() -> new RuntimeException("Deduction not found"));

        Payroll payroll = payrollRepo.findById(payrollId)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));

        deduction.setPayroll(payroll);
        return deductionRepo.save(deduction);
    }

    public void deleteDeduction(Long id) {
        deductionRepo.deleteById(id);
    }
}

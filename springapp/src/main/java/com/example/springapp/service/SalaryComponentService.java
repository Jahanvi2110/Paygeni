package com.example.springapp.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Payroll;
import com.example.springapp.model.SalaryComponent;
import com.example.springapp.repository.PayrollRepository;
import com.example.springapp.repository.SalaryComponentRepository;

@Service
public class SalaryComponentService {
    private final SalaryComponentRepository repo;
    private final PayrollRepository payrollRepo;

    public SalaryComponentService(SalaryComponentRepository repo, PayrollRepository payrollRepo) {
        this.repo = repo;
        this.payrollRepo = payrollRepo;
    }

    public List<SalaryComponent> getAllSalaryComponent() {
        return repo.findAll();
    }

    public Optional<SalaryComponent> getSalaryComponentById(Long id) {
        return repo.findById(id);
    }

    public SalaryComponent createSalaryComponent(SalaryComponent sal) {
        return repo.save(sal);
    }

    public SalaryComponent updateSalaryComponent(SalaryComponent sal) {
        return repo.save(sal);
    }

    public void deleteSalaryComponent(Long id) {
        repo.deleteById(id);
    }

    // ✅ new method
    public SalaryComponent linkPayroll(Long salaryComponentId, Long payrollId) {
        SalaryComponent sc = repo.findById(salaryComponentId)
                .orElseThrow(() -> new RuntimeException("SalaryComponent not found: " + salaryComponentId));

        Payroll payroll = payrollRepo.findById(payrollId)
                .orElseThrow(() -> new RuntimeException("Payroll not found: " + payrollId));

        sc.setPayroll(payroll);
        return repo.save(sc);
    }
}

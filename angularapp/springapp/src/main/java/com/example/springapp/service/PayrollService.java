package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Deduction;
import com.example.springapp.model.Employee;
import com.example.springapp.model.Payroll;
import com.example.springapp.repository.EmployeeRepository;
import com.example.springapp.repository.PayrollRepository;
import com.example.springapp.repository.DeductionRepository;

@Service
public class PayrollService {
    private final PayrollRepository repo;
    private final EmployeeRepository employeeRepo;
    private final DeductionRepository deductionRepo;

    public PayrollService(PayrollRepository repo, EmployeeRepository employeeRepo, DeductionRepository deductionRepo) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
        this.deductionRepo = deductionRepo;
    }


    public List<Payroll> getAllPayrolls() {
        return repo.findAll();
    }

    public Optional<Payroll> getPayrollById(Long id) {
        return repo.findById(id);
    }

    public Payroll createPayroll(Payroll payroll) {
        return repo.save(payroll);
    }

    public Payroll updatePayroll(Payroll payroll) {
        return repo.save(payroll);
    }

    public void deletePayroll(Long id) {
        repo.deleteById(id);
    }

    // ✅ Link payroll with employee
    public Payroll linkPayrollToEmployee(Long payrollId, Long empId) {
        Payroll payroll = repo.findById(payrollId)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));

        Employee employee = employeeRepo.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        payroll.setEmployee(employee);
        return repo.save(payroll);
    }

    public Payroll linkDeductionToPayroll(Long payrollId, Long deductionId) {
        Payroll payroll = repo.findById(payrollId)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));
        Deduction deduction = deductionRepo.findById(deductionId)
                .orElseThrow(() -> new RuntimeException("Deduction not found"));

        deduction.setPayroll(payroll);   // assuming @ManyToOne in Deduction
        deductionRepo.save(deduction);
        return payroll;
    }
}


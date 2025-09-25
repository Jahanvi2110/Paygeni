package com.example.springapp.controller;

import com.example.springapp.model.Payroll;
import com.example.springapp.service.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payrolls") // ✅ plural, REST convention
public class PayrollController {

    private final PayrollService service;

    public PayrollController(PayrollService service) {
        this.service = service;
    }

    @GetMapping
    public List<Payroll> getAllPayrolls() {
        return service.getAllPayrolls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getPayrollById(@PathVariable Long id) {
        return service.getPayrollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Payroll createPayroll(@RequestBody Payroll payroll) {
        return service.createPayroll(payroll);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payroll> updatePayroll(@PathVariable Long id, @RequestBody Payroll payroll) {
        payroll.setId(id);
        return ResponseEntity.ok(service.updatePayroll(payroll));
    }
    @PutMapping("/{payrollId}/link-employees/{empId}")
public ResponseEntity<Payroll> linkPayrollToEmployee(
        @PathVariable Long payrollId,
        @PathVariable Long empId) {
    return ResponseEntity.ok(service.linkPayrollToEmployee(payrollId, empId));
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable Long id) {
        service.deletePayroll(id);
        return ResponseEntity.noContent().build();
    }
}

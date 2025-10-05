package com.example.springapp.controller;

import com.example.springapp.model.Payroll;
import com.example.springapp.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:4200")
public class PayrollController {
    
    @Autowired
    private PayrollService payrollService;
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getPayrollsByEmployee(@PathVariable Long employeeId) {
        try {
            List<Payroll> payrolls = payrollService.getPayrollsByEmployeeId(employeeId);
            return ResponseEntity.ok(payrolls);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/employee/{employeeId}/current")
    public ResponseEntity<?> getCurrentPayroll(@PathVariable Long employeeId) {
        try {
            return payrollService.getCurrentPayroll(employeeId)
                    .map(payroll -> ResponseEntity.ok(payroll))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/employee/{employeeId}/create")
    public ResponseEntity<?> createPayroll(@PathVariable Long employeeId) {
        try {
            Payroll payroll = payrollService.createPayroll(employeeId);
            return ResponseEntity.ok(payroll);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{payrollId}/status")
    public ResponseEntity<?> updatePayrollStatus(@PathVariable Long payrollId, 
                                               @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Payroll payroll = payrollService.updatePayrollStatus(payrollId, status);
            return ResponseEntity.ok(payroll);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllPayrolls() {
        try {
            List<Payroll> payrolls = payrollService.getAllPayrolls();
            return ResponseEntity.ok(payrolls);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getPayrollsByStatus(@PathVariable String status) {
        try {
            List<Payroll> payrolls = payrollService.getPayrollsByStatus(status);
            return ResponseEntity.ok(payrolls);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/comprehensive/{employeeId}")
    public ResponseEntity<?> getComprehensivePayrollDetails(@PathVariable Long employeeId) {
        try {
            Map<String, Object> details = payrollService.getComprehensivePayrollDetails(employeeId);
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    @GetMapping("/all-employees-summary")
    public ResponseEntity<?> getAllEmployeesPayrollSummary() {
        try {
            List<Map<String, Object>> summary = payrollService.getAllEmployeesPayrollSummary();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/employee/{employeeId}/detailed")
    public ResponseEntity<?> getEmployeeDetailedPayroll(@PathVariable Long employeeId) {
        try {
            // Get all payroll records for the employee
            List<Payroll> payrolls = payrollService.getPayrollsByEmployeeId(employeeId);
            
            // Get comprehensive current details
            Map<String, Object> currentDetails = payrollService.getComprehensivePayrollDetails(employeeId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("currentPayroll", currentDetails);
            response.put("payrollHistory", payrolls);
            response.put("totalRecords", payrolls.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}
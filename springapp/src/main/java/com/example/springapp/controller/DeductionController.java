package com.example.springapp.controller;

import com.example.springapp.model.Deduction;
import com.example.springapp.service.DeductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/admin/deductions")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:3000"}, allowCredentials = "true")
public class DeductionController {

    @Autowired
    private DeductionService deductionService;

    /**
     * Get all deductions
     */
    @GetMapping
    public ResponseEntity<List<Deduction>> getAllDeductions() {
        try {
            List<Deduction> deductions = deductionService.getAllDeductions();
            return ResponseEntity.ok(deductions);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Get deduction by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Deduction> getDeductionById(@PathVariable Long id) {
        try {
            return deductionService.getDeductionById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Create new deduction
     */
    @PostMapping
    public ResponseEntity<Deduction> createDeduction(@RequestBody Deduction deduction) {
        try {
            Deduction createdDeduction = deductionService.createDeduction(deduction);
            return ResponseEntity.ok(createdDeduction);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Update deduction
     */
    @PutMapping("/{id}")
    public ResponseEntity<Deduction> updateDeduction(@PathVariable Long id, @RequestBody Deduction deduction) {
        try {
            deduction.setId(id);
            Deduction updatedDeduction = deductionService.updateDeduction(deduction);
            return ResponseEntity.ok(updatedDeduction);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Delete deduction
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeduction(@PathVariable Long id) {
        try {
            deductionService.deleteDeduction(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Populate deductions table with sample data
     */
    @PostMapping("/populate-sample-data")
    public ResponseEntity<Map<String, Object>> populateSampleData() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Deduction> sampleDeductions = createSampleDeductions();
            int createdCount = 0;
            
            for (Deduction deduction : sampleDeductions) {
                Deduction savedDeduction = deductionService.createDeduction(deduction);
                if (savedDeduction != null) {
                    createdCount++;
                }
            }
            
            response.put("success", true);
            response.put("message", "✅ Successfully populated deductions table!");
            response.put("totalEntriesCreated", createdCount);
            response.put("deductionTypes", Arrays.asList("TAX", "PF", "INSURANCE", "OTHER"));
            response.put("months", Arrays.asList("Dec 2024", "Nov 2024", "Oct 2024", "Sep 2024"));
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "❌ Failed to populate deductions: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get all deductions for a specific employee
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<Map<String, Object>> getDeductionsByEmployee(@PathVariable String employeeId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // This would typically call your actual service method
            // For now, return sample data structure
            
            response.put("success", true);
            response.put("message", "✅ Employee deductions retrieved successfully");
            response.put("employeeId", employeeId);
            response.put("sampleDeductions", Arrays.asList(
                Map.of("type", "TAX", "amount", 2500.00, "month", "Dec 2024", "status", "APPROVED"),
                Map.of("type", "PF", "amount", 750.00, "month", "Dec 2024", "status", "APPROVED"),
                Map.of("type", "INSURANCE", "amount", 800.00, "month", "Dec 2024", "status", "APPROVED")
            ));
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "❌ Failed to get deductions: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Create sample deductions data
     */
    private List<Deduction> createSampleDeductions() {
        List<Deduction> deductions = new ArrayList<>();
        
        // Employee data mapping
        Map<String, Map<String, Object>> employees = Map.of(
            "EMP001", Map.of("name", "John Smith", "dept", "Engineering", "salary", 25000.0),
            "EMP002", Map.of("name", "Alice Johnson", "dept", "HR", "salary", 30000.0),
            "EMP003", Map.of("name", "Mike Davis", "dept", "Engineering", "salary", 22000.0),
            "EMP004", Map.of("name", "Emma Wilson", "dept", "Finance", "salary", 28000.0),
            "EMP005", Map.of("name", "David Brown", "dept", "Admin", "salary", 20000.0)
        );
        
        String[] months = {"Dec 2024", "Nov 2024", "Oct 2024", "Sep 2024"};
        
        // Create regular tax deductions for each employee and month
        for (Map.Entry<String, Map<String, Object>> entry : employees.entrySet()) {
            String empId = entry.getKey();
            Map<String, Object> empData = entry.getValue();
            String empName = (String) empData.get("name");
            String empDept = (String) empData.get("dept");
            Double empSalary = (Double) empData.get("salary");
            
            for (String month : months) {
                // Tax deduction (10% of salary)
                Deduction taxDeduction = new Deduction();
                taxDeduction.setEmployeeId(empId);
                taxDeduction.setEmployeeName(empName);
                taxDeduction.setDepartment(empDept);
                taxDeduction.setMonth(month);
                taxDeduction.setYear(2024);
                taxDeduction.setTax(empSalary * 0.10);
                taxDeduction.setPf(0.0);
                taxDeduction.setOther(0.0);
                taxDeduction.setTotalDeduction(empSalary * 0.10);
                taxDeduction.setDeductionType("TAX");
                taxDeduction.setStatus("APPROVED");
                taxDeduction.setDescription(month + " Tax Deduction");
                taxDeduction.setCreatedAt(LocalDate.now());
                taxDeduction.setApprovedBy("HR Admin");
                taxDeduction.setNotes("Regular monthly tax deduction");
                deductions.add(taxDeduction);
                
                // PF deduction (3% of salary)
                Deduction pfDeduction = new Deduction();
                pfDeduction.setEmployeeId(empId);
                pfDeduction.setEmployeeName(empName);
                pfDeduction.setDepartment(empDept);
                pfDeduction.setMonth(month);
                pfDeduction.setYear(2024);
                pfDeduction.setTax(0.0);
                pfDeduction.setPf(empSalary * 0.03);
                pfDeduction.setOther(0.0);
                pfDeduction.setTotalDeduction(empSalary * 0.03);
                pfDeduction.setDeductionType("PF");
                pfDeduction.setStatus("APPROVED");
                pfDeduction.setDescription(month + " PF Contribution");
                pfDeduction.setCreatedAt(LocalDate.now());
                pfDeduction.setApprovedBy("HR Admin");
                pfDeduction.setNotes("Provident Fund contribution");
                deductions.add(pfDeduction);
                
                // Other deductions (2% of salary)
                Deduction otherDeduction = new Deduction();
                otherDeduction.setEmployeeId(empId);
                otherDeduction.setEmployeeName(empName);
                otherDeduction.setDepartment(empDept);
                otherDeduction.setMonth(month);
                otherDeduction.setYear(2024);
                otherDeduction.setTax(0.0);
                otherDeduction.setPf(0.0);
                otherDeduction.setOther(empSalary * 0.02);
                otherDeduction.setTotalDeduction(empSalary * 0.02);
                otherDeduction.setDeductionType("OTHER");
                otherDeduction.setStatus("APPROVED");
                otherDeduction.setDescription(month + " Miscellaneous Deductions");
                otherDeduction.setCreatedAt(LocalDate.now());
                otherDeduction.setApprovedBy("HR Admin");
                otherDeduction.setNotes("Miscellaneous deductions");
                deductions.add(otherDeduction);
            }
        }
        
        // Add special insurance deductions for December
        for (Map.Entry<String, Map<String, Object>> entry : employees.entrySet()) {
            String empId = entry.getKey();
            Map<String, Object> empData = entry.getValue();
            String empName = (String) empData.get("name");
            String empDept = (String) empData.get("dept");
            
            Deduction insuranceDeduction = new Deduction();
            insuranceDeduction.setEmployeeId(empId);
            insuranceDeduction.setEmployeeName(empName);
            insuranceDeduction.setDepartment(empDept);
            insuranceDeduction.setMonth("Dec 2024");
            insuranceDeduction.setYear(2024);
            insuranceDeduction.setTax(0.0);
            insuranceDeduction.setPf(0.0);
            insuranceDeduction.setOther(800.0); // Fixed insurance amount
            insuranceDeduction.setTotalDeduction(800.0);
            insuranceDeduction.setDeductionType("INSURANCE");
            insuranceDeduction.setStatus("APPROVED");
            insuranceDeduction.setDescription("Annual Health Insurance Premium");
            insuranceDeduction.setCreatedAt(LocalDate.now());
            insuranceDeduction.setApprovedBy("HR Admin");
            insuranceDeduction.setNotes("Annual health insurance premium");
            deductions.add(insuranceDeduction);
        }
        
        return deductions;
    }

    /**
     * Get deduction statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getDeductionStatistics() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Sample statistics - in real implementation, you'd query the database
            response.put("success", true);
            response.put("message", "✅ Deduction statistics retrieved");
            response.put("statistics", Map.of(
                "totalEmployees", 5,
                "totalDeductions", 85, // 4 types × 5 employees × 4 months + 5 insurance
                "avgDeduction", 1850.0,
                "deductionTypes", Arrays.asList("TAX", "PF", "OTHER", "INSURANCE"),
                "monthsCovered", Arrays.asList("Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024")
            ));
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "❌ Failed to get statistics: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
}
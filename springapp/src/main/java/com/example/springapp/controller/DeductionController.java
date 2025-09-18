package com.example.springapp.controller;

import com.example.springapp.model.Deduction;
import com.example.springapp.service.DeductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deductions") 
public class DeductionController {

    private final DeductionService service;

    public DeductionController(DeductionService service) {
        this.service = service;
    }


    @GetMapping
    public List<Deduction> getAllDeductions() {
        return service.getAllDeduction();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Deduction> getDeductionById(@PathVariable Long id) {
        return service.getDeduction(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public Deduction createDeduction(@RequestBody Deduction deduction) {
        return service.createDeduction(deduction);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Deduction> updateDeduction(@PathVariable Long id, @RequestBody Deduction deduction) {
        deduction.setId(id);
        return ResponseEntity.ok(service.updateDeduction(deduction));
    }
    @PutMapping("/{deductionId}/link-payrolls/{payrollId}")
public ResponseEntity<Deduction> linkDeductionToPayroll(
        @PathVariable Long deductionId,
        @PathVariable Long payrollId) {
    return ResponseEntity.ok(service.linkDeductionToPayroll(deductionId, payrollId));
}


    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeduction(@PathVariable Long id) {
        service.deleteDeduction(id);
        return ResponseEntity.noContent().build();
    }
}

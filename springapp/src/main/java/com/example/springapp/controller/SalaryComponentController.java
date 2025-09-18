package com.example.springapp.controller;

import com.example.springapp.model.SalaryComponent;
import com.example.springapp.service.SalaryComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salary-components")
public class SalaryComponentController {

    private final SalaryComponentService service;

    public SalaryComponentController(SalaryComponentService service) {
        this.service = service;
    }

    
    @GetMapping
    public List<SalaryComponent> getAllSalaryComponents() {
        return service.getAllSalaryComponent();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<SalaryComponent> getSalaryComponentById(@PathVariable Long id) {
        return service.getSalaryComponentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public SalaryComponent createSalaryComponent(@RequestBody SalaryComponent sal) {
        return service.createSalaryComponent(sal);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<SalaryComponent> updateSalaryComponent(
            @PathVariable Long id,
            @RequestBody SalaryComponent sal) {
        sal.setId(id);
        return ResponseEntity.ok(service.updateSalaryComponent(sal));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalaryComponent(@PathVariable Long id) {
        service.deleteSalaryComponent(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{salaryComponentId}/link-payrolls/{payrollId}")
public ResponseEntity<SalaryComponent> linkPayroll(
        @PathVariable Long salaryComponentId,
        @PathVariable Long payrollId) {
    return ResponseEntity.ok(service.linkPayroll(salaryComponentId, payrollId));
}

}

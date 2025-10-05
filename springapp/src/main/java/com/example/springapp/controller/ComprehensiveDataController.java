package com.example.springapp.controller;

import com.example.springapp.service.ComprehensiveDataPopulatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class ComprehensiveDataController {

    @Autowired
    private ComprehensiveDataPopulatorService dataPopulatorService;

    @PostMapping("/populate-all-tables")
    public ResponseEntity<?> populateAllTablesFromSignups() {
        try {
            Map<String, Object> result = dataPopulatorService.populateAllTablesFromSignups();
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Failed to populate tables: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/data-status")
    public ResponseEntity<?> getDataStatus() {
        try {
            Map<String, Object> status = new HashMap<>();
            
            // Count records in each table
            status.put("users", dataPopulatorService.userRepository.count());
            status.put("employees", dataPopulatorService.employeeRepository.count());
            status.put("payrolls", dataPopulatorService.payrollRepository.count());
            status.put("attendance", dataPopulatorService.attendanceRepository.count());
            status.put("leaveRequests", dataPopulatorService.leaveRequestRepository.count());
            status.put("advanceRequests", dataPopulatorService.advanceRequestRepository.count());
            status.put("salaryComponents", dataPopulatorService.salaryComponentRepository.count());
            status.put("deductions", dataPopulatorService.deductionRepository.count());
            
            // Calculate totals
            long totalRecords = (Long) status.get("users") + (Long) status.get("employees") + 
                              (Long) status.get("payrolls") + (Long) status.get("attendance") + 
                              (Long) status.get("leaveRequests") + (Long) status.get("advanceRequests") + 
                              (Long) status.get("salaryComponents") + (Long) status.get("deductions");
            
            status.put("totalRecords", totalRecords);
            status.put("message", "Data status retrieved successfully");
            
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get data status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}

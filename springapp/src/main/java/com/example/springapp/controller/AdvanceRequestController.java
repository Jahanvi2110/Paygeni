package com.example.springapp.controller;

import com.example.springapp.model.AdvanceRequest;
import com.example.springapp.service.AdvanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/advance")
@CrossOrigin(origins = "http://localhost:4200")
public class AdvanceRequestController {
    
    @Autowired
    private AdvanceRequestService advanceRequestService;
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getAdvanceRequestsByEmployee(@PathVariable Long employeeId) {
        try {
            List<AdvanceRequest> advanceRequests = advanceRequestService.getAdvanceRequestsByEmployeeId(employeeId);
            return ResponseEntity.ok(advanceRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/request")
    public ResponseEntity<?> createAdvanceRequest(@RequestBody Map<String, Object> request) {
        try {
            Long employeeId = Long.valueOf(request.get("employeeId").toString());
            Double requestAmount = Double.valueOf(request.get("requestAmount").toString());
            String reason = request.get("reason").toString();
            
            AdvanceRequest advanceRequest = advanceRequestService.createAdvanceRequest(
                employeeId, requestAmount, reason);
            
            return ResponseEntity.ok(advanceRequest);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{advanceRequestId}/status")
    public ResponseEntity<?> updateAdvanceRequestStatus(@PathVariable Long advanceRequestId, 
                                                      @RequestBody Map<String, Object> request) {
        try {
            String status = request.get("status").toString();
            String approvedBy = request.get("approvedBy").toString();
            Double approvedAmount = request.containsKey("approvedAmount") ? 
                Double.valueOf(request.get("approvedAmount").toString()) : null;
            String repaymentPlan = request.get("repaymentPlan").toString();
            Integer totalInstallments = request.containsKey("totalInstallments") ? 
                Integer.valueOf(request.get("totalInstallments").toString()) : null;
            String rejectionReason = request.get("rejectionReason").toString();
            
            AdvanceRequest advanceRequest = advanceRequestService.updateAdvanceRequestStatus(
                advanceRequestId, status, approvedBy, approvedAmount, repaymentPlan, 
                totalInstallments, rejectionReason);
            
            return ResponseEntity.ok(advanceRequest);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{advanceRequestId}/installment")
    public ResponseEntity<?> processInstallmentPayment(@PathVariable Long advanceRequestId) {
        try {
            AdvanceRequest advanceRequest = advanceRequestService.processInstallmentPayment(advanceRequestId);
            return ResponseEntity.ok(advanceRequest);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingAdvanceRequests() {
        try {
            List<AdvanceRequest> advanceRequests = advanceRequestService.getPendingAdvanceRequests();
            return ResponseEntity.ok(advanceRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/employee/{employeeId}/outstanding")
    public ResponseEntity<?> getOutstandingAmount(@PathVariable Long employeeId) {
        try {
            Double outstandingAmount = advanceRequestService.getTotalOutstandingAmount(employeeId);
            Map<String, Object> response = new HashMap<>();
            response.put("employeeId", employeeId);
            response.put("outstandingAmount", outstandingAmount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getAdvanceRequestsByStatus(@PathVariable String status) {
        try {
            List<AdvanceRequest> advanceRequests = advanceRequestService.getAdvanceRequestsByStatus(status);
            return ResponseEntity.ok(advanceRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @DeleteMapping("/{advanceRequestId}")
    public ResponseEntity<?> deleteAdvanceRequest(@PathVariable Long advanceRequestId) {
        try {
            advanceRequestService.deleteAdvanceRequest(advanceRequestId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Advance request deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}

package com.example.springapp.controller;

import com.example.springapp.model.LeaveRequest;
import com.example.springapp.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leave")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveRequestController {
    
    @Autowired
    private LeaveRequestService leaveRequestService;
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        try {
            List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
            return ResponseEntity.ok(leaveRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/request")
    public ResponseEntity<?> createLeaveRequest(@RequestBody Map<String, Object> request) {
        try {
            Long employeeId = Long.valueOf(request.get("employeeId").toString());
            String leaveType = request.get("leaveType").toString();
            LocalDate startDate = LocalDate.parse(request.get("startDate").toString());
            LocalDate endDate = LocalDate.parse(request.get("endDate").toString());
            String reason = request.get("reason").toString();
            
            LeaveRequest leaveRequest = leaveRequestService.createLeaveRequest(
                employeeId, leaveType, startDate, endDate, reason);
            
            return ResponseEntity.ok(leaveRequest);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{leaveRequestId}/status")
    public ResponseEntity<?> updateLeaveRequestStatus(@PathVariable Long leaveRequestId, 
                                                    @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            String approvedBy = request.get("approvedBy");
            String rejectionReason = request.get("rejectionReason");
            
            LeaveRequest leaveRequest = leaveRequestService.updateLeaveRequestStatus(
                leaveRequestId, status, approvedBy, rejectionReason);
            
            return ResponseEntity.ok(leaveRequest);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingLeaveRequests() {
        try {
            List<LeaveRequest> leaveRequests = leaveRequestService.getPendingLeaveRequests();
            return ResponseEntity.ok(leaveRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getLeaveRequestsByStatus(@PathVariable String status) {
        try {
            List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByStatus(status);
            return ResponseEntity.ok(leaveRequests);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @DeleteMapping("/{leaveRequestId}")
    public ResponseEntity<?> deleteLeaveRequest(@PathVariable Long leaveRequestId) {
        try {
            leaveRequestService.deleteLeaveRequest(leaveRequestId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Leave request deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}

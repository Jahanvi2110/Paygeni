package com.example.springapp.controller;

import com.example.springapp.model.LeaveRequest;
import com.example.springapp.model.Employee;
import com.example.springapp.repository.LeaveRequestRepository;
import com.example.springapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Submit leave request
    @PostMapping("/leave")
    public ResponseEntity<?> submitLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        try {
            // Find employee by email
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(leaveRequest.getEmployeeId().toString());
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                
                // Set employee details
                leaveRequest.setEmployeeId(employee.getId());
                leaveRequest.setEmployeeName(employee.getFirstName());
                leaveRequest.setStatus("PENDING");
                leaveRequest.setAppliedDate(LocalDate.now());
                
                // Calculate total days
                long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(
                    leaveRequest.getStartDate(), leaveRequest.getEndDate()) + 1;
                leaveRequest.setTotalDays((int) daysBetween);
                
                LeaveRequest savedRequest = leaveRequestRepository.save(leaveRequest);
                
                return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Leave request submitted successfully",
                    "requestId", savedRequest.getId(),
                    "status", savedRequest.getStatus()
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Employee not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error submitting leave request: " + e.getMessage()
            ));
        }
    }

    // Get leave requests for employee
    @GetMapping("/leave/{employeeEmail}")
    public ResponseEntity<?> getLeaveRequests(@PathVariable String employeeEmail) {
        try {
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(employeeEmail);
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                List<LeaveRequest> requests = leaveRequestRepository.findByEmployeeId(employee.getId());
                
                return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "requests", requests
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Employee not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error fetching leave requests: " + e.getMessage()
            ));
        }
    }

    // Update leave request status (for admin)
    @PutMapping("/leave/{requestId}/status")
    public ResponseEntity<?> updateLeaveRequestStatus(
            @PathVariable Long requestId, 
            @RequestParam String status,
            @RequestParam(required = false) String approvedBy) {
        try {
            Optional<LeaveRequest> requestOpt = leaveRequestRepository.findById(requestId);
            if (requestOpt.isPresent()) {
                LeaveRequest request = requestOpt.get();
                request.setStatus(status);
                request.setApprovedBy(approvedBy);
                request.setApprovedDate(LocalDate.now());
                
                leaveRequestRepository.save(request);
                
                return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Leave request status updated successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Leave request not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Error updating leave request: " + e.getMessage()
            ));
        }
    }
}

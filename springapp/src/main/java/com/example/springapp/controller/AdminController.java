package com.example.springapp.controller;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private AdvanceRequestRepository advanceRequestRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employee activities (leaves, advances, payrolls)
    @GetMapping("/employee-activities")
    public ResponseEntity<?> getAllEmployeeActivities() {
        try {
            Map<String, Object> activities = new HashMap<>();
            
            // Get all leave requests
            List<LeaveRequest> allLeaveRequests = leaveRequestRepository.findAll();
            activities.put("leaveRequests", allLeaveRequests);
            
            // Get all advance requests
            List<AdvanceRequest> allAdvanceRequests = advanceRequestRepository.findAll();
            activities.put("advanceRequests", allAdvanceRequests);
            
            // Get all payrolls
            List<Payroll> allPayrolls = payrollRepository.findAll();
            activities.put("payrolls", allPayrolls);
            
            // Get all employees
            List<Employee> allEmployees = employeeRepository.findAll();
            activities.put("employees", allEmployees);
            
            // Get all users
            List<User> allUsers = userRepository.findAll();
            activities.put("users", allUsers);
            
            return ResponseEntity.ok(activities);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch employee activities: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Get activities for a specific employee
    @GetMapping("/employee-activities/{employeeId}")
    public ResponseEntity<?> getEmployeeActivities(@PathVariable Long employeeId) {
        try {
            Map<String, Object> activities = new HashMap<>();
            
            // Get leave requests for this employee
            List<LeaveRequest> leaveRequests = leaveRequestRepository.findByEmployeeId(employeeId);
            activities.put("leaveRequests", leaveRequests);
            
            // Get advance requests for this employee
            List<AdvanceRequest> advanceRequests = advanceRequestRepository.findByEmployeeId(employeeId);
            activities.put("advanceRequests", advanceRequests);
            
            // Get payrolls for this employee
            List<Payroll> payrolls = payrollRepository.findByEmployeeId(employeeId);
            activities.put("payrolls", payrolls);
            
            // Get employee details
            Optional<Employee> employee = employeeRepository.findById(employeeId);
            if (employee.isPresent()) {
                activities.put("employee", employee.get());
            }
            
            return ResponseEntity.ok(activities);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch employee activities: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Get all pending requests (leaves and advances)
    @GetMapping("/pending-requests")
    public ResponseEntity<?> getAllPendingRequests() {
        try {
            Map<String, Object> pendingRequests = new HashMap<>();
            
            // Get pending leave requests
            List<LeaveRequest> pendingLeaves = leaveRequestRepository.findByStatus("PENDING");
            pendingRequests.put("pendingLeaves", pendingLeaves);
            
            // Get pending advance requests
            List<AdvanceRequest> pendingAdvances = advanceRequestRepository.findByStatus("PENDING");
            pendingRequests.put("pendingAdvances", pendingAdvances);
            
            // Get approved requests
            List<LeaveRequest> approvedLeaves = leaveRequestRepository.findByStatus("APPROVED");
            pendingRequests.put("approvedLeaves", approvedLeaves);
            
            List<AdvanceRequest> approvedAdvances = advanceRequestRepository.findByStatus("APPROVED");
            pendingRequests.put("approvedAdvances", approvedAdvances);
            
            // Get rejected requests
            List<LeaveRequest> rejectedLeaves = leaveRequestRepository.findByStatus("REJECTED");
            pendingRequests.put("rejectedLeaves", rejectedLeaves);
            
            List<AdvanceRequest> rejectedAdvances = advanceRequestRepository.findByStatus("REJECTED");
            pendingRequests.put("rejectedAdvances", rejectedAdvances);
            
            return ResponseEntity.ok(pendingRequests);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch pending requests: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Get recent activities (last 30 days)
    @GetMapping("/recent-activities")
    public ResponseEntity<?> getRecentActivities() {
        try {
            Map<String, Object> recentActivities = new HashMap<>();
            
            // Get recent leave requests (last 30 days)
            List<LeaveRequest> recentLeaves = leaveRequestRepository.findAll()
                .stream()
                .filter(leave -> leave.getAppliedDate() != null && 
                        leave.getAppliedDate().isAfter(java.time.LocalDate.now().minusDays(30)))
                .collect(Collectors.toList());
            recentActivities.put("recentLeaves", recentLeaves);
            
            // Get recent advance requests (last 30 days)
            List<AdvanceRequest> recentAdvances = advanceRequestRepository.findAll()
                .stream()
                .filter(advance -> advance.getRequestedDate() != null && 
                        advance.getRequestedDate().isAfter(java.time.LocalDate.now().minusDays(30)))
                .collect(Collectors.toList());
            recentActivities.put("recentAdvances", recentAdvances);
            
            // Get recent payrolls (last 30 days)
            List<Payroll> recentPayrolls = payrollRepository.findAll()
                .stream()
                .filter(payroll -> payroll.getProcessedDate() != null && 
                        payroll.getProcessedDate().isAfter(java.time.LocalDate.now().minusDays(30)))
                .collect(Collectors.toList());
            recentActivities.put("recentPayrolls", recentPayrolls);
            
            return ResponseEntity.ok(recentActivities);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch recent activities: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Approve/Reject leave request
    @PutMapping("/leave-request/{requestId}/status")
    public ResponseEntity<?> updateLeaveRequestStatus(
            @PathVariable Long requestId, 
            @RequestBody Map<String, String> request) {
        try {
            Optional<LeaveRequest> leaveRequestOpt = leaveRequestRepository.findById(requestId);
            if (leaveRequestOpt.isPresent()) {
                LeaveRequest leaveRequest = leaveRequestOpt.get();
                String status = request.get("status");
                String notes = request.get("notes");
                
                leaveRequest.setStatus(status);
                if ("APPROVED".equals(status)) {
                    leaveRequest.setApprovedDate(java.time.LocalDate.now());
                } else if ("REJECTED".equals(status)) {
                    leaveRequest.setRejectionReason(notes);
                }
                
                leaveRequestRepository.save(leaveRequest);
                
                Map<String, String> response = new HashMap<>();
                response.put("message", "Leave request " + status.toLowerCase() + " successfully");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Leave request not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update leave request status: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Approve/Reject advance request
    @PutMapping("/advance-request/{requestId}/status")
    public ResponseEntity<?> updateAdvanceRequestStatus(
            @PathVariable Long requestId, 
            @RequestBody Map<String, Object> request) {
        try {
            Optional<AdvanceRequest> advanceRequestOpt = advanceRequestRepository.findById(requestId);
            if (advanceRequestOpt.isPresent()) {
                AdvanceRequest advanceRequest = advanceRequestOpt.get();
                String status = (String) request.get("status");
                String notes = (String) request.get("notes");
                Double approvedAmount = request.get("approvedAmount") != null ? 
                    Double.valueOf(request.get("approvedAmount").toString()) : null;
                
                advanceRequest.setStatus(status);
                if ("APPROVED".equals(status)) {
                    advanceRequest.setApprovedDate(java.time.LocalDate.now());
                    if (approvedAmount != null) {
                        advanceRequest.setApprovedAmount(approvedAmount);
                    }
                } else if ("REJECTED".equals(status)) {
                    advanceRequest.setRejectionReason(notes);
                }
                
                advanceRequestRepository.save(advanceRequest);
                
                Map<String, String> response = new HashMap<>();
                response.put("message", "Advance request " + status.toLowerCase() + " successfully");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Advance request not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update advance request status: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Get dashboard summary for admin
    @GetMapping("/dashboard-summary")
    public ResponseEntity<?> getDashboardSummary() {
        try {
            Map<String, Object> summary = new HashMap<>();
            
            // Count total employees
            long totalEmployees = userRepository.count();
            summary.put("totalEmployees", totalEmployees);
            
            // Count pending requests
            long pendingLeaves = leaveRequestRepository.findByStatus("PENDING").size();
            long pendingAdvances = advanceRequestRepository.findByStatus("PENDING").size();
            summary.put("pendingLeaves", pendingLeaves);
            summary.put("pendingAdvances", pendingAdvances);
            summary.put("totalPendingRequests", pendingLeaves + pendingAdvances);
            
            // Count approved requests this month
            long approvedLeavesThisMonth = leaveRequestRepository.findAll()
                .stream()
                .filter(leave -> leave.getStatus().equals("APPROVED") && 
                        leave.getApprovedDate() != null &&
                        leave.getApprovedDate().getMonth() == java.time.LocalDate.now().getMonth())
                .count();
            long approvedAdvancesThisMonth = advanceRequestRepository.findAll()
                .stream()
                .filter(advance -> advance.getStatus().equals("APPROVED") && 
                        advance.getApprovedDate() != null &&
                        advance.getApprovedDate().getMonth() == java.time.LocalDate.now().getMonth())
                .count();
            
            summary.put("approvedLeavesThisMonth", approvedLeavesThisMonth);
            summary.put("approvedAdvancesThisMonth", approvedAdvancesThisMonth);
            
            // Get recent activities count
            long recentActivities = leaveRequestRepository.findAll()
                .stream()
                .filter(leave -> leave.getAppliedDate() != null && 
                        leave.getAppliedDate().isAfter(java.time.LocalDate.now().minusDays(7)))
                .count() +
                advanceRequestRepository.findAll()
                .stream()
                .filter(advance -> advance.getRequestedDate() != null && 
                        advance.getRequestedDate().isAfter(java.time.LocalDate.now().minusDays(7)))
                .count();
            summary.put("recentActivities", recentActivities);
            
            return ResponseEntity.ok(summary);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch dashboard summary: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}

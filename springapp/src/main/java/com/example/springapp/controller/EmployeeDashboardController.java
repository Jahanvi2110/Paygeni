package com.example.springapp.controller;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:3000"}, allowCredentials = "true")
public class EmployeeDashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PayrollRepository payrollRepository;
    
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private SalaryComponentRepository salaryComponentRepository;
    
    @Autowired
    private DeductionRepository deductionRepository;

    @GetMapping("/dashboard/{email}")
    public ResponseEntity<Map<String, Object>> getEmployeeDashboard(@PathVariable String email) {
        try {
            // Find employee by email
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
            if (!employeeOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Employee employee = employeeOpt.get();
            
            // Get latest payroll record
            List<Payroll> payrolls = payrollRepository.findByEmployeeIdOrderByPayPeriodDesc(employee.getId());
            Payroll latestPayroll = payrolls.isEmpty() ? null : payrolls.get(0);
            
            // Get latest attendance record
            List<Attendance> attendances = attendanceRepository.findByEmployeeIdOrderByCreatedAtDesc(employee.getId().toString());
            Attendance latestAttendance = attendances.isEmpty() ? null : attendances.get(0);
            
            // Get salary components for latest payroll
            List<SalaryComponent> salaryComponents = new ArrayList<>();
            if (latestPayroll != null) {
                salaryComponents = salaryComponentRepository.findByPayrollId(latestPayroll.getId());
            }
            
            // Get deductions for latest payroll
            List<Deduction> deductions = new ArrayList<>();
            if (latestPayroll != null) {
                deductions = deductionRepository.findByPayrollId(latestPayroll.getId());
            }
            
            // Build dashboard response
            Map<String, Object> dashboard = new HashMap<>();
            
            // Employee Information
            Map<String, Object> employeeInfo = new HashMap<>();
            employeeInfo.put("id", employee.getId());
            employeeInfo.put("firstName", employee.getFirstName());
            employeeInfo.put("email", employee.getEmail());
            employeeInfo.put("phone", employee.getPhoneNumber());
            employeeInfo.put("department", employee.getDepartment());
            employeeInfo.put("position", employee.getPosition());
            employeeInfo.put("designation", employee.getDesignation());
            employeeInfo.put("hireDate", employee.getHireDate());
            employeeInfo.put("salary", employee.getSalary());
            employeeInfo.put("status", employee.getStatus());
            employeeInfo.put("address", employee.getAddress());
            dashboard.put("employee", employeeInfo);
            
            // Salary Information
            Map<String, Object> salaryInfo = new HashMap<>();
            if (latestPayroll != null) {
                salaryInfo.put("basicSalary", latestPayroll.getBasicSalary());
                salaryInfo.put("totalEarnings", latestPayroll.getTotalEarnings());
                salaryInfo.put("totalDeductions", latestPayroll.getTotalDeductions());
                salaryInfo.put("netSalary", latestPayroll.getNetSalary());
                salaryInfo.put("payDate", latestPayroll.getPayDate());
                salaryInfo.put("payPeriod", latestPayroll.getPayPeriod());
                salaryInfo.put("status", latestPayroll.getStatus());
            } else {
                salaryInfo.put("basicSalary", employee.getSalary());
                salaryInfo.put("totalEarnings", employee.getSalary() + 15000.0);
                salaryInfo.put("totalDeductions", 12000.0);
                salaryInfo.put("netSalary", employee.getSalary() + 15000.0 - 12000.0);
                salaryInfo.put("payDate", "2024-12-31");
                salaryInfo.put("payPeriod", "Dec 2024");
                salaryInfo.put("status", "PENDING");
            }
            dashboard.put("salary", salaryInfo);
            
            // Attendance Information
            Map<String, Object> attendanceInfo = new HashMap<>();
            if (latestAttendance != null) {
                attendanceInfo.put("presentDays", latestAttendance.getPresentDays());
                attendanceInfo.put("absentDays", latestAttendance.getAbsentDays());
                attendanceInfo.put("leaveDays", latestAttendance.getLeaveDays());
                attendanceInfo.put("totalWorkingDays", latestAttendance.getTotalWorkingDays());
                attendanceInfo.put("attendancePercentage", latestAttendance.getAttendancePercentage());
                attendanceInfo.put("lateArrivals", latestAttendance.getLateArrivals());
                attendanceInfo.put("earlyDepartures", latestAttendance.getEarlyDepartures());
                attendanceInfo.put("month", latestAttendance.getMonth());
                attendanceInfo.put("year", latestAttendance.getYear());
            } else {
                attendanceInfo.put("presentDays", 20);
                attendanceInfo.put("absentDays", 2);
                attendanceInfo.put("leaveDays", 1);
                attendanceInfo.put("totalWorkingDays", 22);
                attendanceInfo.put("attendancePercentage", 90.9);
                attendanceInfo.put("lateArrivals", 1);
                attendanceInfo.put("earlyDepartures", 0);
                attendanceInfo.put("month", "Dec 2024");
                attendanceInfo.put("year", 2024);
            }
            dashboard.put("attendance", attendanceInfo);
            
            // Salary Components
            dashboard.put("salaryComponents", salaryComponents);
            
            // Deductions
            dashboard.put("deductions", deductions);
            
            // Pending Payments (mock data for now)
            List<Map<String, Object>> pendingPayments = Arrays.asList(
                Map.of("type", "Salary", "amount", salaryInfo.get("netSalary"), 
                      "dueDate", "2024-12-31", "status", "Pending", 
                      "description", "December 2024 Salary"),
                Map.of("type", "Bonus", "amount", 15000.0, 
                      "dueDate", "2024-12-25", "status", "Processing", 
                      "description", "Year-end Performance Bonus")
            );
            dashboard.put("pendingPayments", pendingPayments);
            
            // Pending Items (mock data for now)
            List<Map<String, Object>> pendingItems = Arrays.asList(
                Map.of("type", "Leave Request", "title", "Annual Leave Request", 
                      "date", "2024-12-20", "status", "Approved", 
                      "description", "5 days leave for vacation"),
                Map.of("type", "Advance Request", "title", "Emergency Advance", 
                      "amount", 10000.0, "date", "2024-12-18", 
                      "status", "Under Review", "description", "Medical emergency advance"),
                Map.of("type", "Document", "title", "Tax Declaration Form", 
                      "date", "2024-12-15", "status", "Pending", 
                      "description", "Submit before year-end")
            );
            dashboard.put("pendingItems", pendingItems);
            
            return ResponseEntity.ok(dashboard);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }
}

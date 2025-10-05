package com.example.springapp.service;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
public class ComprehensiveDataPopulatorService {

    @Autowired
    public UserRepository userRepository;
    
    @Autowired
    public EmployeeRepository employeeRepository;
    
    @Autowired
    public PayrollRepository payrollRepository;
    
    @Autowired
    public AttendanceRepository attendanceRepository;
    
    @Autowired
    public LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    public AdvanceRequestRepository advanceRequestRepository;
    
    @Autowired
    public SalaryComponentRepository salaryComponentRepository;
    
    @Autowired
    public DeductionRepository deductionRepository;

    public Map<String, Object> populateAllTablesFromSignups() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Clear existing data
            clearAllTables();
            
            // Get all signed up users
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                result.put("success", false);
                result.put("message", "No users found. Please sign up users first.");
                return result;
            }
            
            // Populate all tables based on signup data
            populateEmployeesFromUsers(users);
            populatePayrollsFromUsers(users);
            populateAttendanceFromUsers(users);
            populateLeaveRequestsFromUsers(users);
            populateAdvanceRequestsFromUsers(users);
            populateSalaryComponents();
            populateDeductions();
            
            result.put("success", true);
            result.put("message", "All tables populated successfully from signup data!");
            result.put("usersProcessed", users.size());
            result.put("tablesPopulated", Arrays.asList("employees", "payrolls", "attendance", "leave_requests", "advance_requests", "salary_components", "deductions"));
            
            return result;
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Error populating tables: " + e.getMessage());
            e.printStackTrace();
            return result;
        }
    }
    
    private void clearAllTables() {
        deductionRepository.deleteAll();
        salaryComponentRepository.deleteAll();
        advanceRequestRepository.deleteAll();
        leaveRequestRepository.deleteAll();
        attendanceRepository.deleteAll();
        payrollRepository.deleteAll();
        employeeRepository.deleteAll();
        // Note: We don't delete users as they are the source data
    }
    
    private void populateEmployeesFromUsers(List<User> users) {
        for (User user : users) {
            Employee employee = new Employee();
            employee.setFirstName(user.getFirstName());
            employee.setEmail(user.getEmail());
            employee.setPhoneNumber(user.getPhoneNumber());
            
            // Set role-based details
            if ("ADMIN".equals(user.getRole())) {
                employee.setDesignation("System Administrator");
                employee.setDepartment("Administration");
                employee.setPosition("IT Administrator");
                employee.setSalary(100000.0);
            } else if ("MANAGER".equals(user.getRole())) {
                employee.setDesignation("Department Manager");
                employee.setDepartment("Management");
                employee.setPosition("Department Head");
                employee.setSalary(120000.0);
            } else {
                employee.setDesignation("Software Developer");
                employee.setDepartment("Engineering");
                employee.setPosition("Senior Developer");
                employee.setSalary(75000.0);
            }
            
            employee.setHireDate(LocalDate.now().minusDays(30 + (user.getId() % 365))); // Random hire date
            employee.setStatus("ACTIVE");
            employee.setAddress("123 Main St, City, State");
            employee.setEmergencyContact("Emergency Contact");
            employee.setEmergencyPhone("9876543210");
            
            employeeRepository.save(employee);
        }
    }
    
    private void populatePayrollsFromUsers(List<User> users) {
        String currentPeriod = getCurrentPayPeriod();
        
        for (User user : users) {
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(user.getEmail());
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                
                Payroll payroll = new Payroll();
                payroll.setEmployeeId(employee.getId());
                payroll.setEmployeeName(user.getFirstName());
                payroll.setPayPeriod(currentPeriod);
                payroll.setPayDate(LocalDate.now().plusDays(1));
                
                // Calculate salary based on role
                Double basicSalary = calculateBasicSalary(user);
                payroll.setBasicSalary(basicSalary);
                
                // Calculate allowances
                Double allowances = basicSalary * 0.2; // 20% allowances
                payroll.setAllowances(allowances);
                
                // Calculate overtime
                Double overtime = calculateOvertime(user);
                payroll.setOvertime(overtime);
                
                // Calculate bonus
                Double bonus = calculateBonus(user);
                payroll.setBonus(bonus);
                
                // Calculate total earnings
                Double totalEarnings = basicSalary + allowances + overtime + bonus;
                payroll.setTotalEarnings(totalEarnings);
                
                // Calculate deductions
                Double taxDeduction = calculateTaxDeduction(totalEarnings);
                Double insuranceDeduction = calculateInsuranceDeduction(basicSalary);
                Double loanDeduction = 0.0; // Will be updated when advance requests are processed
                Double otherDeductions = calculateOtherDeductions(basicSalary);
                
                payroll.setTaxDeduction(taxDeduction);
                payroll.setInsuranceDeduction(insuranceDeduction);
                payroll.setLoanDeduction(loanDeduction);
                payroll.setOtherDeductions(otherDeductions);
                
                Double totalDeductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
                payroll.setTotalDeductions(totalDeductions);
                
                // Calculate net salary
                Double netSalary = totalEarnings - totalDeductions;
                payroll.setNetSalary(netSalary);
                
                payroll.setStatus("PENDING");
                payroll.setPaymentMethod("BANK_TRANSFER");
                payroll.setProcessedDate(LocalDate.now());
                payroll.setProcessedBy("SYSTEM");
                payroll.setNotes(String.format("Monthly salary for %s - Generated from signup data", currentPeriod));
                
                payrollRepository.save(payroll);
            }
        }
    }
    
    private void populateAttendanceFromUsers(List<User> users) {
        for (User user : users) {
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(user.getEmail());
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                
                // Create attendance records for the last 30 days
                for (int i = 0; i < 30; i++) {
                    LocalDate date = LocalDate.now().minusDays(i);
                    
                    // Skip weekends
                    if (date.getDayOfWeek().getValue() > 5) continue;
                    
                Attendance attendance = new Attendance();
                attendance.setEmployeeId(employee.getId().toString());
                attendance.setEmployeeName(user.getFirstName());
                attendance.setDate(date);
                    
                    // Random attendance status (90% present, 10% absent)
                    if (Math.random() < 0.9) {
                        attendance.setStatus("Present");
                        attendance.setCheckInTime("09:00 AM");
                        attendance.setCheckOutTime("06:00 PM");
                        attendance.setHoursWorked(8.0);
                    } else {
                        attendance.setStatus("Absent");
                        attendance.setCheckInTime("N/A");
                        attendance.setCheckOutTime("N/A");
                        attendance.setHoursWorked(0.0);
                    }
                    
                    attendance.setNotes("Generated from signup data");
                    attendanceRepository.save(attendance);
                }
            }
        }
    }
    
    private void populateLeaveRequestsFromUsers(List<User> users) {
        for (User user : users) {
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(user.getEmail());
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                
                // Create 1-3 leave requests per user
                int numRequests = 1 + (int)(Math.random() * 3);
                
                for (int i = 0; i < numRequests; i++) {
                    LeaveRequest leaveRequest = new LeaveRequest();
                    leaveRequest.setEmployeeId(employee.getId());
                    leaveRequest.setEmployeeName(user.getFirstName());
                    
                    // Random leave types
                    String[] leaveTypes = {"ANNUAL", "SICK", "CASUAL", "PERSONAL"};
                    leaveRequest.setLeaveType(leaveTypes[(int)(Math.random() * leaveTypes.length)]);
                    
                    // Random dates
                    LocalDate startDate = LocalDate.now().minusDays(10 + (int)(Math.random() * 20));
                    LocalDate endDate = startDate.plusDays(1 + (int)(Math.random() * 3));
                    
                    leaveRequest.setStartDate(startDate);
                    leaveRequest.setEndDate(endDate);
                    leaveRequest.setReason("Leave request generated from signup data");
                    
                    // Random status
                    String[] statuses = {"PENDING", "APPROVED", "REJECTED"};
                    leaveRequest.setStatus(statuses[(int)(Math.random() * statuses.length)]);
                    
                    leaveRequest.setRequestedDate(startDate.minusDays(1));
                    leaveRequest.setApprovedBy("ADMIN");
                    leaveRequest.setApprovalDate(startDate.minusDays(1));
                    leaveRequest.setNotes("Generated from signup data");
                    
                    leaveRequestRepository.save(leaveRequest);
                }
            }
        }
    }
    
    private void populateAdvanceRequestsFromUsers(List<User> users) {
        for (User user : users) {
            Optional<Employee> employeeOpt = employeeRepository.findByEmail(user.getEmail());
            if (employeeOpt.isPresent()) {
                Employee employee = employeeOpt.get();
                
                // Create 0-2 advance requests per user
                int numRequests = (int)(Math.random() * 3);
                
                for (int i = 0; i < numRequests; i++) {
                    AdvanceRequest advanceRequest = new AdvanceRequest();
                    advanceRequest.setEmployeeId(employee.getId());
                    advanceRequest.setEmployeeName(user.getFirstName());
                    
                    // Random amount between 5000-50000
                    advanceRequest.setAmount(5000 + Math.random() * 45000);
                    advanceRequest.setReason("Advance request generated from signup data");
                    
                    // Random repayment plan
                    String[] plans = {"MONTHLY", "QUARTERLY", "YEARLY"};
                    advanceRequest.setRepaymentPlan(plans[(int)(Math.random() * plans.length)]);
                    
                    // Random status
                    String[] statuses = {"PENDING", "APPROVED", "REJECTED"};
                    advanceRequest.setStatus(statuses[(int)(Math.random() * statuses.length)]);
                    
                    advanceRequest.setRequestedDate(LocalDate.now().minusDays(5 + (int)(Math.random() * 15)));
                    advanceRequest.setApprovedBy("ADMIN");
                    advanceRequest.setApprovalDate(LocalDate.now().minusDays(2 + (int)(Math.random() * 10)));
                    advanceRequest.setNotes("Generated from signup data");
                    
                    advanceRequestRepository.save(advanceRequest);
                }
            }
        }
    }
    
    private void populateSalaryComponents() {
        // Create standard salary components
        String[] componentNames = {"Basic Salary", "HRA", "DA", "Medical Allowance", "Transport Allowance"};
        String[] componentTypes = {"Earnings", "Earnings", "Earnings", "Earnings", "Earnings"};
        Double[] amounts = {75000.0, 15000.0, 5000.0, 3000.0, 2000.0};
        
        for (int i = 0; i < componentNames.length; i++) {
            SalaryComponent component = new SalaryComponent();
            component.setComponentName(componentNames[i]);
            component.setComponentType(componentTypes[i]);
            component.setAmount(amounts[i]);
            component.setIsTaxable(true);
            salaryComponentRepository.save(component);
        }
    }
    
    private void populateDeductions() {
        // Create standard deductions
        String[] deductionNames = {"Income Tax", "Provident Fund", "ESI", "Professional Tax", "Health Insurance"};
        String[] deductionTypes = {"Tax", "Statutory", "Statutory", "Tax", "Insurance"};
        Double[] amounts = {5000.0, 2000.0, 500.0, 200.0, 1000.0};
        
        for (int i = 0; i < deductionNames.length; i++) {
            Deduction deduction = new Deduction();
            deduction.setDeductionName(deductionNames[i]);
            deduction.setDeductionType(deductionTypes[i]);
            deduction.setAmount(amounts[i]);
            deductionRepository.save(deduction);
        }
    }
    
    // Helper methods for calculations
    private String getCurrentPayPeriod() {
        LocalDate now = LocalDate.now();
        return now.format(DateTimeFormatter.ofPattern("MMM yyyy"));
    }
    
    private Double calculateBasicSalary(User user) {
        if ("ADMIN".equals(user.getRole())) {
            return 80000.0;
        } else if ("MANAGER".equals(user.getRole())) {
            return 70000.0;
        } else {
            return 60000.0;
        }
    }
    
    private Double calculateOvertime(User user) {
        return 2000.0 + (Math.random() * 3000);
    }
    
    private Double calculateBonus(User user) {
        if ("ADMIN".equals(user.getRole())) {
            return 15000.0 + (Math.random() * 5000);
        } else if ("MANAGER".equals(user.getRole())) {
            return 10000.0 + (Math.random() * 5000);
        } else {
            return 5000.0 + (Math.random() * 5000);
        }
    }
    
    private Double calculateTaxDeduction(Double totalEarnings) {
        if (totalEarnings <= 50000) {
            return totalEarnings * 0.05;
        } else if (totalEarnings <= 100000) {
            return 2500 + (totalEarnings - 50000) * 0.10;
        } else {
            return 7500 + (totalEarnings - 100000) * 0.15;
        }
    }
    
    private Double calculateInsuranceDeduction(Double basicSalary) {
        return Math.min(basicSalary * 0.02, 3000.0);
    }
    
    private Double calculateOtherDeductions(Double basicSalary) {
        Double esi = Math.min(basicSalary * 0.0075, 500.0);
        Double professionalTax = 200.0;
        return esi + professionalTax;
    }
}

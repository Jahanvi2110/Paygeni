package com.example.springapp.service;

import com.example.springapp.model.Payroll;
import com.example.springapp.model.User;
import com.example.springapp.repository.PayrollRepository;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PayrollService {
    
    @Autowired
    private PayrollRepository payrollRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Payroll> getPayrollsByEmployeeId(Long employeeId) {
        return payrollRepository.findByEmployeeIdOrderByPayPeriodDesc(employeeId);
    }
    
    public Optional<Payroll> getCurrentPayroll(Long employeeId) {
        String currentPeriod = getCurrentPayPeriod();
        return payrollRepository.findByEmployeeIdAndPayPeriod(employeeId, currentPeriod);
    }
    
    public Payroll createPayroll(Long employeeId) {
        Optional<User> userOpt = userRepository.findById(employeeId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }
        
        User user = userOpt.get();
        String currentPeriod = getCurrentPayPeriod();
        
        // Check if payroll already exists for this period
        Optional<Payroll> existingPayroll = payrollRepository.findByEmployeeIdAndPayPeriod(employeeId, currentPeriod);
        if (existingPayroll.isPresent()) {
            return existingPayroll.get();
        }
        
        // Create new payroll record with comprehensive details
        Payroll payroll = new Payroll();
        payroll.setEmployeeId(employeeId);
        payroll.setEmployeeName(user.getFirstName());
        payroll.setPayPeriod(currentPeriod);
        
        // Generate unique Payroll ID
        String payrollId = generatePayrollId(employeeId, currentPeriod);
        payroll.setPayrollId(payrollId);
        
        // Set basic salary based on employee role and experience
        Double basicSalary = calculateBasicSalary(user);
        payroll.setBasicSalary(basicSalary);
        
        // Calculate detailed allowances
        Double hra = basicSalary * 0.15; // 15% HRA
        Double da = basicSalary * 0.05;  // 5% DA
        Double allowances = hra + da;
        payroll.setAllowances(allowances);
        
        // Calculate overtime based on role
        Double overtime = calculateOvertime(user);
        payroll.setOvertime(overtime);
        
        // Calculate bonus based on performance
        Double bonus = calculateBonus(user);
        payroll.setBonus(bonus);
        
        // Calculate total earnings
        Double totalEarnings = basicSalary + allowances + overtime + bonus;
        payroll.setTotalEarnings(totalEarnings);
        
        // Calculate comprehensive deductions
        Double taxDeduction = calculateTaxDeduction(totalEarnings);
        Double insuranceDeduction = calculateInsuranceDeduction(basicSalary);
        Double pfDeduction = calculatePF(basicSalary);
        Double loanDeduction = getOutstandingLoanAmount(employeeId);
        Double otherDeductions = calculateOtherDeductions(basicSalary);
        
        // Calculate attendance-based deductions
        Double attendanceDeduction = calculateAttendanceDeduction(employeeId, basicSalary);
        
        // Calculate leave-based deductions
        Double leaveDeduction = calculateLeaveDeduction(employeeId, basicSalary);
        
        payroll.setTaxDeduction(taxDeduction);
        payroll.setInsuranceDeduction(insuranceDeduction);
        payroll.setLoanDeduction(loanDeduction);
        payroll.setOtherDeductions(otherDeductions);
        payroll.setAttendanceDeduction(attendanceDeduction);
        payroll.setLeaveDeduction(leaveDeduction);
        
        Double totalDeductions = taxDeduction + insuranceDeduction + pfDeduction + loanDeduction + 
                               otherDeductions + attendanceDeduction + leaveDeduction;
        payroll.setTotalDeductions(totalDeductions);
        
        // Calculate net salary
        Double netSalary = totalEarnings - totalDeductions;
        payroll.setNetSalary(netSalary);
        
        // Set payment details
        payroll.setStatus("PENDING");
        payroll.setPaymentMethod("BANK_TRANSFER");
        payroll.setProcessedDate(LocalDate.now());
        payroll.setProcessedBy("SYSTEM");
        payroll.setPayDate(LocalDate.now().plusDays(1)); // Next day payment
        payroll.setNotes(String.format("Payroll ID: %s | Period: %s | Basic: ₹%.2f, Net: ₹%.2f | Attendance Ded: ₹%.2f | Leave Ded: ₹%.2f", 
            payrollId, currentPeriod, basicSalary, netSalary, attendanceDeduction, leaveDeduction));
        
        return payrollRepository.save(payroll);
    }
    
    private Double calculateBasicSalary(User user) {
        // Base salary calculation based on role
        Double baseSalary = 50000.0; // Default base salary
        
        if ("ADMIN".equals(user.getRole())) {
            baseSalary = 80000.0;
        } else if ("MANAGER".equals(user.getRole())) {
            baseSalary = 70000.0;
        } else {
            baseSalary = 60000.0; // EMPLOYEE role
        }
        
        // Add some variation based on employee ID (simulating experience)
        Double experienceFactor = 1.0 + (user.getId() % 5) * 0.1; // 0-40% increase
        
        return baseSalary * experienceFactor;
    }
    
    private Double calculateOvertime(User user) {
        // Overtime calculation based on role
        Double baseOvertime = 2000.0;
        
        if ("ADMIN".equals(user.getRole())) {
            baseOvertime = 3000.0;
        } else if ("MANAGER".equals(user.getRole())) {
            baseOvertime = 2500.0;
        }
        
        // Add some random variation
        return baseOvertime + (Math.random() * 2000);
    }
    
    private Double calculateBonus(User user) {
        // Bonus calculation based on role and performance
        Double baseBonus = 5000.0;
        
        if ("ADMIN".equals(user.getRole())) {
            baseBonus = 15000.0;
        } else if ("MANAGER".equals(user.getRole())) {
            baseBonus = 10000.0;
        }
        
        // Add performance-based variation
        return baseBonus + (Math.random() * 5000);
    }
    
    private Double calculateTaxDeduction(Double totalEarnings) {
        // Progressive tax calculation
        if (totalEarnings <= 50000) {
            return totalEarnings * 0.05; // 5% tax
        } else if (totalEarnings <= 100000) {
            return 2500 + (totalEarnings - 50000) * 0.10; // 10% on excess
        } else {
            return 7500 + (totalEarnings - 100000) * 0.15; // 15% on excess
        }
    }
    
    private Double calculateInsuranceDeduction(Double basicSalary) {
        // Health insurance calculation
        return Math.min(basicSalary * 0.02, 3000.0); // 2% of basic, max ₹3000
    }
    
    private Double calculatePF(Double basicSalary) {
        // Provident Fund calculation
        return basicSalary * 0.12; // 12% of basic salary
    }
    
    private Double calculateOtherDeductions(Double basicSalary) {
        // Other deductions like ESI, professional tax, etc.
        Double esi = Math.min(basicSalary * 0.0075, 500.0); // 0.75% ESI, max ₹500
        Double professionalTax = 200.0; // Fixed professional tax
        return esi + professionalTax;
    }
    
    private Double getOutstandingLoanAmount(Long employeeId) {
        // This would typically query advance requests
        // For now, return a small amount
        return 0.0; // Will be updated when advance requests are processed
    }
    
    public Map<String, Object> getComprehensivePayrollDetails(Long employeeId) {
        Map<String, Object> details = new HashMap<>();
        
        // Get employee info
        Optional<User> userOpt = userRepository.findById(employeeId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Employee not found");
        }
        User user = userOpt.get();
        
        // Get current payroll
        Optional<Payroll> currentPayroll = getCurrentPayroll(employeeId);
        if (currentPayroll.isEmpty()) {
            // Create payroll if it doesn't exist
            currentPayroll = Optional.of(createPayroll(employeeId));
        }
        
        Payroll payroll = currentPayroll.get();
        
        // Build comprehensive details
        details.put("employeeId", employeeId);
        details.put("employeeName", user.getFirstName());
        details.put("email", user.getEmail());
        details.put("phoneNumber", user.getPhoneNumber());
        details.put("role", user.getRole());
        
        // Payroll details
        details.put("payPeriod", payroll.getPayPeriod());
        details.put("payDate", payroll.getPayDate());
        details.put("status", payroll.getStatus());
        details.put("paymentMethod", payroll.getPaymentMethod());
        
        // Salary breakdown
        Map<String, Double> earnings = new HashMap<>();
        earnings.put("basicSalary", payroll.getBasicSalary());
        earnings.put("allowances", payroll.getAllowances());
        earnings.put("overtime", payroll.getOvertime());
        earnings.put("bonus", payroll.getBonus());
        earnings.put("totalEarnings", payroll.getTotalEarnings());
        details.put("earnings", earnings);
        
        // Deductions breakdown
        Map<String, Double> deductions = new HashMap<>();
        deductions.put("taxDeduction", payroll.getTaxDeduction());
        deductions.put("insuranceDeduction", payroll.getInsuranceDeduction());
        deductions.put("loanDeduction", payroll.getLoanDeduction());
        deductions.put("otherDeductions", payroll.getOtherDeductions());
        deductions.put("totalDeductions", payroll.getTotalDeductions());
        details.put("deductions", deductions);
        
        // Net salary
        details.put("netSalary", payroll.getNetSalary());
        
        // Additional info
        details.put("processedDate", payroll.getProcessedDate());
        details.put("processedBy", payroll.getProcessedBy());
        details.put("notes", payroll.getNotes());
        
        return details;
    }
    
    public List<Map<String, Object>> getAllEmployeesPayrollSummary() {
        List<User> allUsers = userRepository.findAll();
        List<Map<String, Object>> summary = new ArrayList<>();
        
        for (User user : allUsers) {
            try {
                Map<String, Object> employeeSummary = getComprehensivePayrollDetails(user.getId());
                summary.add(employeeSummary);
            } catch (Exception e) {
                // Skip users with errors
                System.err.println("Error processing payroll for user " + user.getId() + ": " + e.getMessage());
            }
        }
        
        return summary;
    }
    
    public Payroll updatePayrollStatus(Long payrollId, String status) {
        Optional<Payroll> payrollOpt = payrollRepository.findById(payrollId);
        if (payrollOpt.isEmpty()) {
            throw new RuntimeException("Payroll not found");
        }
        
        Payroll payroll = payrollOpt.get();
        payroll.setStatus(status);
        payroll.setProcessedDate(LocalDate.now());
        
        return payrollRepository.save(payroll);
    }
    
    public Payroll updateLoanDeduction(Long employeeId, Double loanAmount) {
        String currentPeriod = getCurrentPayPeriod();
        Optional<Payroll> payrollOpt = payrollRepository.findByEmployeeIdAndPayPeriod(employeeId, currentPeriod);
        
        if (payrollOpt.isEmpty()) {
            throw new RuntimeException("Payroll not found for current period");
        }
        
        Payroll payroll = payrollOpt.get();
        payroll.setLoanDeduction(loanAmount);
        
        // Recalculate total deductions and net salary
        Double totalDeductions = payroll.getTaxDeduction() + payroll.getInsuranceDeduction() + 
                                loanAmount + payroll.getOtherDeductions();
        payroll.setTotalDeductions(totalDeductions);
        
        Double netSalary = payroll.getTotalEarnings() - totalDeductions;
        payroll.setNetSalary(netSalary);
        
        return payrollRepository.save(payroll);
    }
    
    private String getCurrentPayPeriod() {
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        return now.format(formatter);
    }
    
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }
    
    public List<Payroll> getPayrollsByStatus(String status) {
        return payrollRepository.findByStatus(status);
    }
    
    private String generatePayrollId(Long employeeId, String payPeriod) {
        // Generate unique payroll ID: EMP + EmployeeID + Period + Random
        String periodCode = payPeriod.replace(" ", "").substring(0, 3).toUpperCase();
        String randomCode = String.format("%03d", (int)(Math.random() * 1000));
        return String.format("EMP%d%s%s", employeeId, periodCode, randomCode);
    }
    
    private Double calculateAttendanceDeduction(Long employeeId, Double basicSalary) {
        // Calculate attendance deduction based on actual attendance records
        // For now, simulate based on random attendance percentage
        double attendancePercentage = 85 + (Math.random() * 15); // 85-100%
        
        if (attendancePercentage < 90) {
            // Deduct for poor attendance
            double deductionPercentage = (90 - attendancePercentage) / 100.0;
            return basicSalary * deductionPercentage * 0.1; // 10% of basic salary per percentage point
        }
        
        return 0.0; // No deduction for good attendance
    }
    
    private Double calculateLeaveDeduction(Long employeeId, Double basicSalary) {
        // Calculate leave deduction based on leave requests
        // For now, simulate based on random leave days
        int leaveDays = (int)(Math.random() * 5); // 0-4 days
        
        if (leaveDays > 2) {
            // Deduct for excessive leave
            return basicSalary * (leaveDays - 2) * 0.05; // 5% per extra day
        }
        
        return 0.0; // No deduction for reasonable leave
    }
}
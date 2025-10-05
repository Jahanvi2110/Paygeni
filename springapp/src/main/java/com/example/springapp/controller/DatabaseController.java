package com.example.springapp.controller;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4201")
public class DatabaseController {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PayrollRepository payrollRepository;
    
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private SalaryComponentRepository salaryComponentRepository;
    
    @Autowired
    private DeductionRepository deductionRepository;

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = employeeRepository.findAll();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/populate-database")
    public ResponseEntity<Map<String, Object>> populateDatabase() {
        try {
            Map<String, Object> result = new HashMap<>();
            
            // Clear existing data
            deductionRepository.deleteAll();
            salaryComponentRepository.deleteAll();
            attendanceRepository.deleteAll();
            payrollRepository.deleteAll();
            userRepository.deleteAll();
            employeeRepository.deleteAll();
            
            // Create sample employees
            List<Employee> employees = createSampleEmployees();
            employeeRepository.saveAll(employees);
            result.put("employeesCreated", employees.size());
            
            // Create users for employees
            createUsers(employees);
            result.put("usersCreated", employees.size());
            
            // Create payroll records
            createPayrollRecords(employees);
            result.put("payrollRecordsCreated", employees.size());
            
            // Create attendance records
            createAttendanceRecords(employees);
            result.put("attendanceRecordsCreated", employees.size());
            
            // Create salary components
            createSalaryComponents();
            result.put("salaryComponentsCreated", "Multiple");
            
            // Create deductions
            createDeductions();
            result.put("deductionsCreated", "Multiple");
            
            result.put("success", true);
            result.put("message", "Database populated successfully!");
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error populating database: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    private List<Employee> createSampleEmployees() {
        return Arrays.asList(
            // Employee 1: John Smith
            createEmployee("John", "john.smith@company.com", "9876543210", 
                          "Software Developer", "Engineering", "Senior Developer", 
                          LocalDate.of(2023, 1, 15), 75000.0, "ACTIVE",
                          "123 Main St, City", "Jane Smith", "9876543211"),
            
            // Employee 2: Sarah Johnson
            createEmployee("Sarah", "sarah.johnson@company.com", "9876543212", 
                          "HR Manager", "Human Resources", "HR Manager", 
                          LocalDate.of(2022, 6, 1), 85000.0, "ACTIVE",
                          "456 Oak Ave, City", "Mike Johnson", "9876543213"),
            
            // Employee 3: Michael Brown
            createEmployee("Michael", "michael.brown@company.com", "9876543214", 
                          "Project Manager", "Engineering", "Senior Project Manager", 
                          LocalDate.of(2021, 3, 10), 95000.0, "ACTIVE",
                          "789 Pine Rd, City", "Lisa Brown", "9876543215"),
            
            // Employee 4: Emily Davis
            createEmployee("Emily", "emily.davis@company.com", "9876543216", 
                          "UI/UX Designer", "Design", "Senior Designer", 
                          LocalDate.of(2023, 8, 20), 70000.0, "ACTIVE",
                          "321 Elm St, City", "Tom Davis", "9876543217"),
            
            // Employee 5: David Wilson
            createEmployee("David", "david.wilson@company.com", "9876543218", 
                          "DevOps Engineer", "Engineering", "DevOps Specialist", 
                          LocalDate.of(2022, 11, 5), 80000.0, "ACTIVE",
                          "654 Maple Dr, City", "Anna Wilson", "9876543219"),
            
            // Employee 6: Lisa Anderson
            createEmployee("Lisa", "lisa.anderson@company.com", "9876543220", 
                          "Marketing Manager", "Marketing", "Marketing Lead", 
                          LocalDate.of(2022, 2, 14), 78000.0, "ACTIVE",
                          "987 Cedar Ln, City", "John Anderson", "9876543221"),
            
            // Employee 7: Robert Taylor
            createEmployee("Robert", "robert.taylor@company.com", "9876543222", 
                          "QA Engineer", "Quality Assurance", "Senior QA Engineer", 
                          LocalDate.of(2023, 5, 8), 65000.0, "ACTIVE",
                          "147 Birch St, City", "Mary Taylor", "9876543223"),
            
            // Employee 8: Jennifer Martinez
            createEmployee("Jennifer", "jennifer.martinez@company.com", "9876543224", 
                          "Business Analyst", "Business", "Senior Business Analyst", 
                          LocalDate.of(2021, 9, 12), 72000.0, "ACTIVE",
                          "258 Spruce Ave, City", "Carlos Martinez", "9876543225"),
            
            // Employee 9: Admin User
            createEmployee("Admin", "admin@company.com", "9876543226", 
                          "System Administrator", "Administration", "IT Administrator", 
                          LocalDate.of(2020, 1, 1), 100000.0, "ACTIVE",
                          "369 Admin Blvd, City", "System Admin", "9876543227"),
            
            // Employee 10: Manager User
            createEmployee("Manager", "manager@company.com", "9876543228", 
                          "Department Manager", "Management", "Department Head", 
                          LocalDate.of(2021, 1, 1), 120000.0, "ACTIVE",
                          "741 Manager St, City", "Management Team", "9876543229")
        );
    }

    private Employee createEmployee(String firstName, String email, 
                                  String phone, String designation, String department, 
                                  String position, LocalDate hireDate, Double salary, 
                                  String status, String address, String emergencyContact, 
                                  String emergencyPhone) {
        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setEmail(email);
        employee.setPhoneNumber(phone);
        employee.setDesignation(designation);
        employee.setDepartment(department);
        employee.setPosition(position);
        employee.setHireDate(hireDate);
        employee.setSalary(salary);
        employee.setStatus(status);
        employee.setAddress(address);
        employee.setEmergencyContact(emergencyContact);
        employee.setEmergencyPhone(emergencyPhone);
        return employee;
    }

    private void createUsers(List<Employee> employees) {
        for (Employee employee : employees) {
            User user = new User();
            user.setFirstName(employee.getFirstName());
            user.setPhoneNumber(employee.getPhoneNumber());
            user.setEmail(employee.getEmail());
            user.setPassword("password123"); // Default password - will be hashed by AuthService
            user.setRole(employee.getEmail().contains("admin") || employee.getEmail().contains("manager") ? "ADMIN" : "EMPLOYEE");
            userRepository.save(user);
        }
    }

    private void createPayrollRecords(List<Employee> employees) {
        for (Employee employee : employees) {
            // Create payroll for current month
            Payroll payroll = new Payroll();
            payroll.setPayDate(LocalDate.of(2024, 12, 31));
            payroll.setBasicSalary(employee.getSalary());
            payroll.setTotalEarnings(employee.getSalary() + 15000.0); // Basic + allowances
            payroll.setTotalDeductions(12000.0); // Taxes, insurance, etc.
            payroll.setNetSalary(employee.getSalary() + 15000.0 - 12000.0);
            payroll.setEmployeeId(employee.getId());
            payroll.setEmployeeName(employee.getFirstName());
            payroll.setPayPeriod("Dec 2024");
            payroll.setStatus("PAID");
            payroll.setPaymentMethod("BANK_TRANSFER");
            payroll.setProcessedDate(LocalDate.now());
            payroll.setProcessedBy("System");
            payroll.setNotes("Monthly salary payment");
            payrollRepository.save(payroll);
        }
    }

    private void createAttendanceRecords(List<Employee> employees) {
        for (Employee employee : employees) {
            Attendance attendance = new Attendance();
            attendance.setEmployeeId(employee.getId().toString());
            attendance.setEmployeeName(employee.getFirstName());
            attendance.setDepartment(employee.getDepartment());
            attendance.setMonth("Dec 2024");
            attendance.setYear(2024);
            attendance.setPresentDays(20);
            attendance.setPresent(20); // Set the present field for database compatibility
            attendance.setAbsentDays(2);
            attendance.setLeaveDays(1);
            attendance.setTotalWorkingDays(22);
            attendance.setAttendancePercentage(90.9);
            attendance.setLateArrivals(1);
            attendance.setEarlyDepartures(0);
            attendance.setLastAttendanceDate("2024-12-20");
            attendance.setCreatedAt(LocalDate.now());
            attendance.setNotes("Good attendance record");
            attendance.setEmployee(employee);
            attendanceRepository.save(attendance);
        }
    }

    private void createSalaryComponents() {
        // Get all payroll records to create salary components
        List<Payroll> payrolls = payrollRepository.findAll();
        
        for (Payroll payroll : payrolls) {
            // HRA Component
            SalaryComponent hra = new SalaryComponent();
            hra.setComponentName("HRA");
            hra.setAmount(15000.0);
            hra.setPayrollId(payroll.getId());
            hra.setComponentType("EARNING");
            hra.setDescription("House Rent Allowance");
            hra.setIsTaxable(true);
            hra.setStatus("ACTIVE");
            hra.setPayroll(payroll);
            salaryComponentRepository.save(hra);
            
            // Bonus Component
            SalaryComponent bonus = new SalaryComponent();
            bonus.setComponentName("Performance Bonus");
            bonus.setAmount(5000.0);
            bonus.setPayrollId(payroll.getId());
            bonus.setComponentType("EARNING");
            bonus.setDescription("Q4 Performance Bonus");
            bonus.setIsTaxable(true);
            bonus.setStatus("ACTIVE");
            bonus.setPayroll(payroll);
            salaryComponentRepository.save(bonus);
        }
    }

    private void createDeductions() {
        // Get all payroll records to create deductions
        List<Payroll> payrolls = payrollRepository.findAll();
        
        for (Payroll payroll : payrolls) {
            // Tax Deduction
            Deduction tax = new Deduction();
            tax.setEmployeeId(payroll.getEmployeeId().toString());
            tax.setEmployeeName(payroll.getEmployeeName());
            tax.setDeductionType("Income Tax");
            tax.setTax(8000.0);
            tax.setTotalDeduction(8000.0);
            tax.setDescription("Monthly income tax deduction");
            tax.setStatus("ACTIVE");
            tax.setCreatedAt(LocalDate.now());
            tax.setPayroll(payroll);
            deductionRepository.save(tax);
            
            // Insurance Deduction
            Deduction insurance = new Deduction();
            insurance.setEmployeeId(payroll.getEmployeeId().toString());
            insurance.setEmployeeName(payroll.getEmployeeName());
            insurance.setDeductionType("Health Insurance");
            insurance.setOther(2000.0);
            insurance.setTotalDeduction(2000.0);
            insurance.setDescription("Monthly health insurance premium");
            insurance.setStatus("ACTIVE");
            insurance.setCreatedAt(LocalDate.now());
            insurance.setPayroll(payroll);
            deductionRepository.save(insurance);
            
            // Provident Fund Deduction
            Deduction pf = new Deduction();
            pf.setEmployeeId(payroll.getEmployeeId().toString());
            pf.setEmployeeName(payroll.getEmployeeName());
            pf.setDeductionType("Provident Fund");
            pf.setPf(2000.0);
            pf.setTotalDeduction(2000.0);
            pf.setDescription("Monthly PF contribution");
            pf.setStatus("ACTIVE");
            pf.setCreatedAt(LocalDate.now());
            pf.setPayroll(payroll);
            deductionRepository.save(pf);
        }
    }
}

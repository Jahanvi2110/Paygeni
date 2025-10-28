package com.example.springapp.controller;

import com.example.springapp.model.User;
import com.example.springapp.model.Employee;
import com.example.springapp.service.AuthService;
import com.example.springapp.service.EmployeeService;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:3000"}, allowCredentials = "true")
public class AuthController {
 
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> userData) {
        try {
            User user = new User();





            user.setUsername((String) userData.get("username"));
            user.setEmail((String) userData.get("email"));
            user.setPassword((String) userData.get("password"));
            user.setRole((String) userData.getOrDefault("role", "EMPLOYEE"));
            user.setEmployeeId((Long) userData.getOrDefault("employeeId", 1L)); // Default employee ID
            user.setFirstName((String) userData.get("firstName"));
            user.setLastName((String) userData.get("lastName"));
            user.setPhoneNumber((String) userData.get("phoneNumber"));
            user.setDepartment((String) userData.getOrDefault("department", "General"));
            
            // Set required fields with default values
            user.setStatus("ACTIVE");
            user.setCreatedAt(java.time.LocalDate.now());
            user.setCreatedBy("SYSTEM");
            user.setNotes("User created via signup");
            
            User savedUser = authService.signup(user);
            
            // Automatically create corresponding Employee record
            createEmployeeFromUser(savedUser);
            
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        try {
            User user = authService.login(data.get("email"), data.get("password"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> userData) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                // Update user fields
                if (userData.containsKey("firstName")) {
                    user.setFirstName((String) userData.get("firstName"));
                }
                if (userData.containsKey("email")) {
                    user.setEmail((String) userData.get("email"));
                }
                if (userData.containsKey("phoneNumber")) {
                    user.setPhoneNumber((String) userData.get("phoneNumber"));
                }
                if (userData.containsKey("role")) {
                    user.setRole((String) userData.get("role"));
                }
                if (userData.containsKey("department")) {
                    user.setDepartment((String) userData.get("department"));
                }
                if (userData.containsKey("status")) {
                    user.setStatus((String) userData.get("status"));
                }
                if (userData.containsKey("salary")) {
                    // Note: User model doesn't have salary field, but we can store it in notes or create a separate field
                    user.setNotes("Salary: " + userData.get("salary"));
                }
                
                User updatedUser = userRepository.save(user);
                
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User updated successfully");
                response.put("user", updatedUser);
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> data) {
        try {
            String email = data.get("email");
            String newPassword = data.get("newPassword");
            String confirmPassword = data.get("confirmPassword");
            
            // Validate inputs
            if (email == null || email.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (newPassword == null || newPassword.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "New password is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (confirmPassword == null || confirmPassword.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Confirm password is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (!newPassword.equals(confirmPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Passwords do not match");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (newPassword.length() < 6) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Password must be at least 6 characters long");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Find user by email
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (!userOpt.isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found with this email");
                return ResponseEntity.badRequest().body(error);
            }
            
            User user = userOpt.get();
            
            // Update password (it will be encoded in the service)
            authService.updatePassword(user, newPassword);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password updated successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    private void createEmployeeFromUser(User user) {
        try {
            // Check if employee already exists with this email
            if (employeeService.findByEmail(user.getEmail()).isPresent()) {
                System.out.println("Employee already exists for email: " + user.getEmail());
                return;
            }

            // Create new Employee record from User data
            Employee employee = new Employee();
            employee.setFirstName(user.getFirstName());
            employee.setLastName(user.getLastName());
            employee.setEmail(user.getEmail());
            employee.setPhoneNumber(user.getPhoneNumber());
            employee.setDepartment(user.getDepartment() != null ? user.getDepartment() : "General");
            employee.setDesignation("Employee");
            employee.setPosition("Staff");
            employee.setHireDate(LocalDate.now());
            employee.setStatus("ACTIVE");
            employee.setSalary(50000.0); // Default salary
            
            employeeService.createEmployee(employee);
            System.out.println("Created employee record for user: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Error creating employee record: " + e.getMessage());
            // Don't throw exception to avoid breaking signup process
        }
    }
}
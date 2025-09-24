package com.example.springapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        // For demo purposes, we'll use simple validation
        // In production, this should use proper authentication
        Map<String, Object> response = new HashMap<>();
        
        if ("admin".equals(username) && "admin123".equals(password)) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "id", "1",
                "name", "Admin User",
                "email", "admin@paygeni.com",
                "role", "admin"
            ));
            response.put("token", "demo-admin-token");
        } else if ("employee".equals(username) && "emp123".equals(password)) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "id", "2",
                "name", "Employee User",
                "email", "employee@paygeni.com",
                "role", "employee"
            ));
            response.put("token", "demo-employee-token");
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> userData) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration successful");
        response.put("user", Map.of(
            "id", "3",
            "name", userData.get("fullName"),
            "email", userData.get("email"),
            "role", "employee"
        ));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        
        if (auth != null && auth.isAuthenticated()) {
            response.put("authenticated", true);
            response.put("username", auth.getName());
            response.put("authorities", auth.getAuthorities());
        } else {
            response.put("authenticated", false);
        }
        
        return ResponseEntity.ok(response);
    }
}

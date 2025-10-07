package com.example.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role = "EMPLOYEE";

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(name = "employee_ref_id")
    private Long employeeRefId;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "department")
    private String department;

    @Column(name = "status")
    private String status = "ACTIVE";

    @Column(name = "last_login_date")
    private LocalDate lastLoginDate;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Constructors
    public User() {}

    public User(String username, String password, String role, Long employeeId) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.employeeId = employeeId;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    
    public Long getEmployeeRefId() { return employeeRefId; }
    public void setEmployeeRefId(Long employeeRefId) { this.employeeRefId = employeeRefId; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDate getLastLoginDate() { return lastLoginDate; }
    public void setLastLoginDate(LocalDate lastLoginDate) { this.lastLoginDate = lastLoginDate; }
    
    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
    
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}


package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "users")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN, EMPLOYEE, HR, MANAGER

    @Column(nullable = false)
    private Long employeeId; // Link to employee ID

    private String email;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String department;
    private String status; // ACTIVE, INACTIVE, SUSPENDED
    private LocalDate lastLoginDate;
    private LocalDate createdAt;
    private String createdBy;
    private String notes;

    // ✅ Foreign key to Employee
    @OneToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
}

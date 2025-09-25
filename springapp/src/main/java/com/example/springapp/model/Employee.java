package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;
    private String designation;
    private String department;
    private String position;
    private LocalDate hireDate;
    private Double salary;
    private String status; // ACTIVE, INACTIVE, TERMINATED
    private String address;
    private String emergencyContact;
    private String emergencyPhone;

    // ✅ One-to-One with UserAccount
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private UserAccount userAccount;
}

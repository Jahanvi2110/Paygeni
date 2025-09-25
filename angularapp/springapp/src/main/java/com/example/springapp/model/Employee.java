package com.example.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;
    private String designation;

    // ✅ One-to-One with UserAccount
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private UserAccount userAccount;
}

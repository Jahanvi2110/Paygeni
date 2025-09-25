package com.example.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private boolean present;

    // ✅ Link attendance to an employee
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

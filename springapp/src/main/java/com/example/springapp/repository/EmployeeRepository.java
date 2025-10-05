package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.springapp.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}

package com.example.springapp.service;

import com.example.springapp.model.Employee;
import com.example.springapp.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return repo.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        return repo.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        return repo.findById(id).map(existing -> {
            existing.setFirstName(employee.getFirstName());
            existing.setLastName(employee.getLastName());
            existing.setEmail(employee.getEmail());
            existing.setPhoneNumber(employee.getPhoneNumber());
            existing.setDesignation(employee.getDesignation());
            existing.setDepartment(employee.getDepartment());
            existing.setPosition(employee.getPosition());
            existing.setSalary(employee.getSalary());
            existing.setStatus(employee.getStatus());
            existing.setAddress(employee.getAddress());
            existing.setEmergencyContact(employee.getEmergencyContact());
            existing.setEmergencyPhone(employee.getEmergencyPhone());
            return repo.save(existing);
        }).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }

    public Employee save(Employee employee) {
        return repo.save(employee);
    }

    public Optional<Employee> findByEmail(String email) {
        return repo.findByEmail(email);
    }
}

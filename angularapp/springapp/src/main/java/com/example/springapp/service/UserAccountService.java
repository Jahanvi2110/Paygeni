package com.example.springapp.service;

import com.example.springapp.model.Employee;
import com.example.springapp.model.UserAccount;
import com.example.springapp.repository.EmployeeRepository;
import com.example.springapp.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAccountService {

    private final UserAccountRepository userRepo;
    private final EmployeeRepository empRepo;

    public UserAccountService(UserAccountRepository userRepo, EmployeeRepository empRepo) {
        this.userRepo = userRepo;
        this.empRepo = empRepo;
    }

    public List<UserAccount> getAllUserAccounts() {
        return userRepo.findAll();
    }

    public Optional<UserAccount> getUserAccountById(Long id) {
        return userRepo.findById(id);
    }

    public UserAccount createUserAccount(UserAccount user) {
        return userRepo.save(user);
    }

    public UserAccount updateUserAccount(Long id, UserAccount user) {
        return userRepo.findById(id).map(existing -> {
            existing.setUsername(user.getUsername());
            existing.setPassword(user.getPassword());
            existing.setRole(user.getRole());
            if (user.getEmployee() != null) {
                existing.setEmployee(user.getEmployee());
            }
            return userRepo.save(existing);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUserAccount(Long id) {
        userRepo.deleteById(id);
    }

    
    public UserAccount linkUserToEmployee(Long userId, Long empId) {
        UserAccount user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Employee emp = empRepo.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        user.setEmployee(emp);
        return userRepo.save(user);
    }
}

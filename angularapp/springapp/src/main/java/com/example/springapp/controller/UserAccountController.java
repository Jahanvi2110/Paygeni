package com.example.springapp.controller;

import com.example.springapp.model.UserAccount;
import com.example.springapp.service.UserAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")

public class UserAccountController {

    private final UserAccountService service;

    public UserAccountController(UserAccountService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserAccount> getAllUserAccounts() {
        return service.getAllUserAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> getUserAccountById(@PathVariable Long id) {
        return service.getUserAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UserAccount createUserAccount(@RequestBody UserAccount user) {
        return service.createUserAccount(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAccount> updateUserAccount(@PathVariable Long id, @RequestBody UserAccount user) {
        try {
            return ResponseEntity.ok(service.updateUserAccount(id, user));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAccount(@PathVariable Long id) {
        service.deleteUserAccount(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Link existing employee
    @PutMapping("/{userId}/link-employee/{empId}")
    public ResponseEntity<UserAccount> linkUserToEmployee(@PathVariable Long userId, @PathVariable Long empId) {
        return ResponseEntity.ok(service.linkUserToEmployee(userId, empId));
    }
}

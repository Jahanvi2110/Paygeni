package com.example.springapp.service;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired(required = false)
    private PasswordEncoder passwordEncoder;

    // Signup
    public User signup(User user) {
        // Encode password before saving
        if (passwordEncoder != null && user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    // Login
    public User login(String email, String password) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            throw new Exception("User not found");
        }

        User user = userOpt.get();

        if (passwordEncoder != null) {
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new Exception("Invalid credentials");
            }
        } else {
            if (!password.equals(user.getPassword())) {
                throw new Exception("Invalid credentials");
            }
        }

        return user;
    }

    // Update password
    public void updatePassword(User user, String newPassword) {
        if (passwordEncoder != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
        } else {
            user.setPassword(newPassword);
        }
        userRepository.save(user);
    }
    @PostConstruct
public void printExamplePassword() {
    System.out.println("Example encoded password check:");
    System.out.println(passwordEncoder.matches("admin123", "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5..."));
}

}

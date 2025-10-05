package com.example.springapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {
    
    @GetMapping("/")
    public String home() {
        return "Spring Boot is working! 🎉";
    }
    
    @GetMapping("/test")
    public String test() {
        return "Test endpoint working! ✅";
    }
    
    @GetMapping("/health")
    public String health() {
        return "Application is healthy! 💚";
    }
}


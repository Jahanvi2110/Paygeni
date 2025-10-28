import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  phoneNumber = '';
  email = '';
  password = '';
  confirmPassword = '';
  
  // Password visibility toggles
  showPassword = false;
  showConfirmPassword = false;
  
  // Form validation states
  isSubmitting = false;
  formErrors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Form validation
  validateForm() {
    this.formErrors = {};
    let isValid = true;

    // First name validation
    if (!this.firstName.trim()) {
      this.formErrors.firstName = 'First name is required';
      isValid = false;
    } else if (this.firstName.trim().length < 2) {
      this.formErrors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    // Last name validation
    if (!this.lastName.trim()) {
      this.formErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (this.lastName.trim().length < 2) {
      this.formErrors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    }


    // Phone number validation
    if (!this.phoneNumber.trim()) {
      this.formErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(this.phoneNumber.replace(/\D/g, ''))) {
      this.formErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Email validation
    if (!this.email.trim()) {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!this.password) {
      this.formErrors.password = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!this.confirmPassword) {
      this.formErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  onSignup() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    
    console.log('Signup attempt:', {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password
    });
    
    this.authService.signup({ 
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.email, // Use email as username
      phoneNumber: this.phoneNumber,
      email: this.email, 
      password: this.password, 
      role: 'EMPLOYEE' 
    })
      .subscribe({
        next: res => {
          console.log('Signup successful:', res);
          this.isSubmitting = false;
          
          // Show success message and redirect
          alert('✅ Account created successfully! Please login to continue.');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Signup error:', err);
          this.isSubmitting = false;
          alert('❌ Signup failed: ' + (err.error?.error || err.error?.message || err.message || 'Unknown error'));
        }
      });
  }
}
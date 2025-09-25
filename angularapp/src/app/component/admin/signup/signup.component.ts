import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Error messages
  emailError: string = '';
  phoneError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  submitted = false;

  onRegister() {
    this.submitted = true;
    let valid = true;

    // Email validation
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
      this.emailError = 'Enter a valid email address';
      valid = false;
    } else {
      this.emailError = '';
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(this.phone)) {
      this.phoneError = 'Enter a valid 10-digit phone number';
      valid = false;
    } else {
      this.phoneError = '';
    }

    // Password validation
    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      valid = false;
    } else {
      this.passwordError = '';
    }

    // Confirm Password
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      valid = false;
    } else {
      this.confirmPasswordError = '';
    }

    if (valid) {
      alert('✅ Registration successful!');
    }
  }

  loginWithGoogle() {
    // Google login functionality
    alert('Google login functionality will be implemented here');
  }

  // Helper methods for password validation
  hasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasNumber(password: string): boolean {
    return /[0-9]/.test(password);
  }
}

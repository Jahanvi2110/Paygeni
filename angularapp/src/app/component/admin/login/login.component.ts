import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  
  // Password visibility toggle
  showPassword = false;
  
  // Form validation states
  isSubmitting = false;
  formErrors: any = {};
  
  // Forgot password states
  showForgotPassword = false;
  newPassword = '';
  confirmPassword = '';
  showNewPassword = false;
  showConfirmPassword = false;
  isSubmittingForgot = false;
  forgotPasswordErrors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Form validation
  validateForm() {
    this.formErrors = {};
    let isValid = true;

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
    }

    return isValid;
  }

  // Forgot password validation
  validateForgotPasswordForm() {
    this.forgotPasswordErrors = {};
    let isValid = true;

    // Email validation
    if (!this.email.trim()) {
      this.forgotPasswordErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.forgotPasswordErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // New password validation
    if (!this.newPassword) {
      this.forgotPasswordErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (this.newPassword.length < 6) {
      this.forgotPasswordErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!this.confirmPassword) {
      this.forgotPasswordErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.newPassword !== this.confirmPassword) {
      this.forgotPasswordErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  // Show forgot password form
  showForgotPasswordForm() {
    this.showForgotPassword = true;
    this.newPassword = '';
    this.confirmPassword = '';
    this.forgotPasswordErrors = {};
  }

  // Hide forgot password form
  hideForgotPasswordForm() {
    this.showForgotPassword = false;
    this.newPassword = '';
    this.confirmPassword = '';
    this.forgotPasswordErrors = {};
  }

  onLogin() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    
    console.log('Login attempt:', {
      email: this.email,
      password: this.password
    });
    
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          console.log('Login successful:', res);
          this.authService.storeUser(res);
          this.isSubmitting = false;
          this.routeByRole(res.role);
        },
        error: err => {
          console.error('Login error:', err);
          this.isSubmitting = false;
          alert('❌ Login failed: ' + (err.error?.error || err.error?.message || err.message || 'Invalid credentials'));
        }
      });
  }

  private routeByRole(role: string) {
    const normalized = (role || '')
      .toString()
      .toUpperCase()
      .replace(/^ROLE_/, '');

    if (normalized === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (normalized === 'EMPLOYEE') {
      this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Forgot password submission
  onForgotPassword() {
    if (!this.validateForgotPasswordForm()) {
      return;
    }

    this.isSubmittingForgot = true;
    
    console.log('Forgot password attempt:', {
      email: this.email,
      newPassword: this.newPassword
    });
    
    this.authService.forgotPassword({
      email: this.email,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    })
      .subscribe({
        next: (res: any) => {
          console.log('Password updated successfully:', res);
          this.isSubmittingForgot = false;
          
          // Show success message and reset form
          alert('✅ Password updated successfully! You can now login with your new password.');
          this.hideForgotPasswordForm();

        },
        error: err => {
          console.error('Password update error:', err);
          this.isSubmittingForgot = false;
          alert('❌ Failed to update password: ' + (err.error?.error || err.error?.message || err.message || 'Unknown error'));
        }
      });
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  phone = '';
  password = '';
  rememberMe = false;

  emailError = '';
  phoneError = '';
  passwordError = '';

  // Forgot password
  showForgotPassword = false;
  forgotEmail = '';
  forgotEmailError = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Login submit
  onSubmit() {
    this.emailError = '';
    this.phoneError = '';
    this.passwordError = '';

    let valid = true;

    const emailPattern = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.emailError = 'Enter a valid lowercase email (must contain @).';
      valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.phone)) {
      this.phoneError = 'Phone must be exactly 10 digits.';
      valid = false;
    }

    if (this.password.trim().length < 1) {
      this.passwordError = 'Password cannot be empty.';
      valid = false;
    }

    if (valid) {
      // Store login credentials
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.email);
        localStorage.setItem('rememberedPassword', this.password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      // Determine user type and redirect accordingly
      this.authenticateAndRedirect();
    }
  }

  private authenticateAndRedirect() {
    // Use the authentication service
    const loginSuccess = this.authService.login(this.email, this.phone, this.password);
    
    if (loginSuccess) {
      const user = this.authService.getCurrentUser();
      
      if (this.authService.isAdmin()) {
        alert(`Welcome Admin ${user.name}! Redirecting to admin dashboard...`);
        this.router.navigate(['/admin-dashboard']);
      } else {
        alert(`Welcome ${user.name}! Redirecting to your dashboard...`);
        this.router.navigate(['/employee-dashboard']);
      }
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }

  loginWithGoogle() {
    window.location.href = 'https://accounts.google.com/signin';
  }

  // Forgot password modal
  openForgotPassword() {
    this.forgotEmail = '';
    this.forgotEmailError = '';
    this.showForgotPassword = true;
  }

  closeForgotPassword() {
    this.showForgotPassword = false;
  }

  submitForgotPassword() {
    if (!this.forgotEmail) {
      this.forgotEmailError = 'Email is required';
      return;
    }

    // Trigger backend API here
    console.log('Reset password for:', this.forgotEmail);

    alert('If the email exists, a reset link has been sent!');
    this.closeForgotPassword();
  }
}

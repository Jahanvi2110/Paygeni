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
  phoneNumber = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.signup({ 
      firstName: this.firstName,
      phoneNumber: this.phoneNumber,
      email: this.email, 
      password: this.password, 
      role: 'EMPLOYEE' 
    })
      .subscribe({
        next: res => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Signup error:', err);
          alert('Signup failed: ' + (err.error?.error || err.error?.message || err.message || 'Unknown error'));
        }
      });
  }
}
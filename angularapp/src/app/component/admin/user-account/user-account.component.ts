import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserAccountService, UserAccount } from '../../../service/user-account.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  users: UserAccount[] = [];

  newUser: UserAccount = {
    id: null,
    firstName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private userService: UserAccountService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Load all users from backend
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: UserAccount[]) => this.users = data,
      error: (err: any) => console.error('Failed to load users', err)
    });
  }

  // Save user (create or update)
  saveUser() {
    if (this.newUser.id) {
      // Update existing user
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe({
        next: (updated: UserAccount) => {
          const index = this.users.findIndex(u => u.id === updated.id);
          if (index > -1) this.users[index] = updated;
          this.resetForm();
        },
        error: (err: any) => console.error('Update failed', err)
      });
    } else {
      // Create new user
      this.userService.createUser(this.newUser).subscribe({
        next: (created: UserAccount) => {
          this.users.push(created);
          this.resetForm();
        },
        error: (err: any) => console.error('Creation failed', err)
      });
    }
  }

  // Edit user
  editUser(user: UserAccount) {
    this.newUser = { ...user };
  }

  // Delete user
  deleteUser(id: number | null) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          console.log('User deleted successfully');
        },
        error: (err: any) => console.error('Delete failed', err)
      });
    }
  }

  // Reset form
  resetForm() {
    this.newUser = { id: null, firstName: '', phoneNumber: '', email: '', password: '', role: '' };
  }

  // Get admin count
  getAdminCount(): number {
    return this.users.filter(user => user.role.toUpperCase() === 'ADMIN').length;
  }

  // Get employee count
  getEmployeeCount(): number {
    return this.users.filter(user => user.role.toUpperCase() === 'EMPLOYEE').length;
  }

  // Track by function for better performance
  trackByUserId(index: number, user: UserAccount): number | null {
    return user.id;
  }
}

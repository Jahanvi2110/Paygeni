import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


interface UserAccount {
  id: number | null;
  username: string;
  password: string;
  role: string;
  employeeId: number | null;
}

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  users: UserAccount[] = [
    { id: 1, username: 'john', password: '1234', role: 'ADMIN', employeeId: 101 },
    { id: 2, username: 'jane', password: 'abcd', role: 'EMPLOYEE', employeeId: 102 }
  ];

  newUser: UserAccount = {
    id: null,
    username: '',
    password: '',
    role: '',
    employeeId: null
  };

  // Save user (create or update)
  saveUser() {
    if (this.newUser.id) {
      const index = this.users.findIndex(u => u.id === this.newUser.id);
      if (index > -1) this.users[index] = { ...this.newUser };
    } else {
      const newId = this.users.length ? Math.max(...this.users.map(u => u.id!)) + 1 : 1;
      this.users.push({ ...this.newUser, id: newId });
    }
    this.resetForm();
  }

  // Edit user
  editUser(user: UserAccount) {
    this.newUser = { ...user };
  }

  // Delete user
  deleteUser(id: number | null) {
    this.users = this.users.filter(u => u.id !== id);
  }

  // Reset form
  resetForm() {
    this.newUser = { id: null, username: '', password: '', role: '', employeeId: null };
  }

  // Get admin count
  getAdminCount(): number {
    return this.users.filter(user => user.role === 'ADMIN').length;
  }

  // Get employee count
  getEmployeeCount(): number {
    return this.users.filter(user => user.role === 'EMPLOYEE').length;
  }

  // Track by function for better performance
  trackByUserId(index: number, user: UserAccount): number | null {
    return user.id;
  }
}

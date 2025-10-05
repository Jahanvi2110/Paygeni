export interface UserAccount {
  id?: number;
  username: string;
  password: string;
  role: string; // ADMIN, EMPLOYEE, HR, MANAGER
  employeeId: number; // Link to employee ID
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  status?: string; // ACTIVE, INACTIVE, SUSPENDED
  lastLoginDate?: string; // ISO date string
  createdAt?: string; // ISO date string
  createdBy?: string;
  notes?: string;
}

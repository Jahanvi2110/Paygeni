export interface Employee {
  id?: number | Long; // Support both number and Long
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  designation?: string;
  department?: string;
  position?: string;
  hireDate?: string; // ISO date string
  salary?: number;
  status?: string; // ACTIVE, INACTIVE, TERMINATED
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Additional fields to match backend
  fullName?: string; // Derived from firstName + lastName
}

// Type alias for compatibility
type Long = number;

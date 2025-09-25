export interface UserAccount {
  id?: number;
  username: string;
  password: string;
  role: string;
  employeeId?: number; // link to employee
}

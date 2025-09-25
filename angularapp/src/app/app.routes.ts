import { Routes } from '@angular/router';
import { LandingComponent } from './component/website/landing.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },  // default route
  { path: 'home', component: LandingComponent },


  { 
    path: 'login', 
    loadComponent: () => import('./component/admin/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'signup', 
    loadComponent: () => import('./component/admin/signup/signup.component').then(m => m.SignupComponent) 
  },
  { 
    path: 'user-account', 
    loadComponent: () => import('./component/admin/user-account/user-account.component').then(m => m.UserAccountComponent) 
  },
  { 
    path: 'employees', 
    loadComponent: () => import('./component/admin/employee/employees.component').then(m => m.EmployeesComponent)
  },
  { 
    path: 'admin-dashboard', 
    loadComponent: () => import('./component/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  { 
    path: 'payrolls', 
    loadComponent: () => import('./component/admin/payroll/payroll.component').then(m => m.PayrollComponent)
  },
  { 
    path: 'salary', 
    loadComponent: () => import('./component/admin/salarycomponent/salary.component').then(m => m.SalaryComponent)
  },
  { 
    path: 'attendance', 
    loadComponent: () => import('./component/admin/attendance/attendance.component').then(m => m.AttendanceComponent)
  },
  { 
    path: 'deduction', 
    loadComponent: () => import('./component/admin/deduction/deduction.component').then(m => m.DeductionComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./component/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'employee-dashboard', 
    loadComponent: () => import('./component/admin/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent) 
  }
];

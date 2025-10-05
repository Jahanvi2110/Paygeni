# Full-Stack Payroll Management System

## Quick Start

### Option 1: Use the startup script (Recommended)
```bash
# Double-click this file or run from command prompt:
start-fullstack.bat
```

### Option 2: Manual startup
```bash
# Terminal 1 - Start Spring Boot Backend
cd springapp
java -jar target/springapp-0.0.1-SNAPSHOT.jar

# Terminal 2 - Start Angular Frontend  
cd angularapp
ng serve --proxy-config proxy.conf.json --port 4200
```

## Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:9090

## Test the Integration

### 1. Sign Up
- Go to http://localhost:4200/signup
- Enter your real name, email, phone, password
- Data will be saved to MySQL database

### 2. Login
- Go to http://localhost:4200/login
- Use your email and password
- You'll see your personalized dashboard

### 3. Admin Dashboard
- Login as admin: `admin@company.com` / `admin123`
- View all employees in the admin dashboard
- Use pagination to browse employees

## Database
- **Database**: MySQL `springapp`
- **Tables**: `employees`, `users`, `payrolls`, `attendance`, `deductions`
- **Connection**: localhost:3306, user: root, password: root

## Features
✅ User signup and login  
✅ Role-based authentication (admin/employee)  
✅ Personalized employee dashboards  
✅ Admin dashboard with employee management  
✅ Database integration  
✅ Pagination  
✅ Leave and advance request forms  

## Troubleshooting
- If Spring Boot doesn't start: Check if port 9090 is free
- If Angular doesn't start: Check if port 4200 is free
- If database connection fails: Ensure MySQL is running
- If signup doesn't work: Check browser console for errors

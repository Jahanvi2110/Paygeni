-- =====================================================
-- DATABASE SCHEMA MATCHING FRONTEND MODELS EXACTLY
-- Supports JSON data storage for springapp database
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Drop existing tables
DROP TABLE IF EXISTS deductions;
DROP TABLE IF EXISTS salary_components;
DROP TABLE IF EXISTS payrolls;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS user_accounts;
DROP TABLE IF EXISTS employees;

-- Step 3: Create EMPLOYEES table (matches angularapp/src/models/employee.ts)
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20),
    designation VARCHAR(100),
    department VARCHAR(100),
    position VARCHAR(100),
    hireDate DATE,
    salary DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    address TEXT,
    emergencyContact VARCHAR(255),
    emergencyPhone VARCHAR(20),
    fullName VARCHAR(255), -- Derived field
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 4: Create USER_ACCOUNTS table (matches angularapp/src/models/useraccount.ts)
CREATE TABLE user_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- ADMIN, EMPLOYEE, HR, MANAGER
    employeeId BIGINT,
    email VARCHAR(255),
    phoneNumber VARCHAR(20),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    department VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    lastLoginDate DATE,
    createdAt DATE,
    createdBy VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE SET NULL
);

-- Step 5: Create PAYROLLS table (matches angularapp/src/models/payroll.ts)
CREATE TABLE payrolls (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payDate VARCHAR(50) NOT NULL, -- ISO string format
    basicSalary DECIMAL(10,2) NOT NULL,
    totalEarnings DECIMAL(10,2) NOT NULL,
    totalDeductions DECIMAL(10,2) NOT NULL,
    netSalary DECIMAL(10,2) NOT NULL,
    employeeId BIGINT NOT NULL,
    employeeName VARCHAR(255),
    department VARCHAR(100),
    payPeriod VARCHAR(50), -- e.g., "Sep 2025"
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PROCESSED, PAID
    paymentMethod VARCHAR(50), -- BANK_TRANSFER, CHECK, CASH
    processedDate VARCHAR(50), -- ISO string format
    processedBy VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
);

-- Step 6: Create DEDUCTIONS table (matches angularapp/src/models/deduction.ts)
CREATE TABLE deductions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employeeId VARCHAR(50) NOT NULL,
    employeeName VARCHAR(255) NOT NULL,
    employeePhoto VARCHAR(500),
    department VARCHAR(100),
    month VARCHAR(50) NOT NULL, -- e.g., "Sep 2025"
    year INT,
    tax DECIMAL(10,2) NOT NULL,
    pf DECIMAL(10,2) NOT NULL,
    other DECIMAL(10,2) NOT NULL,
    totalDeduction DECIMAL(10,2) NOT NULL,
    deductionType VARCHAR(50), -- TAX, PF, INSURANCE, OTHER
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    description TEXT,
    createdAt VARCHAR(50), -- ISO string format
    approvedBy VARCHAR(255),
    notes TEXT,
    payrollId BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payrollId) REFERENCES payrolls(id) ON DELETE SET NULL
);

-- Step 7: Create ATTENDANCE table (matches angularapp/src/models/attendance.ts)
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employeeId VARCHAR(50) NOT NULL,
    employeeName VARCHAR(255) NOT NULL,
    employeePhoto VARCHAR(500),
    department VARCHAR(100),
    month VARCHAR(50) NOT NULL, -- e.g., "Sep 2025"
    year INT,
    presentDays INT NOT NULL,
    absentDays INT NOT NULL,
    leaveDays INT NOT NULL,
    totalWorkingDays INT DEFAULT 22,
    attendancePercentage DECIMAL(5,2),
    lateArrivals INT DEFAULT 0,
    earlyDepartures INT DEFAULT 0,
    lastAttendanceDate VARCHAR(50), -- ISO string format
    createdAt VARCHAR(50), -- ISO string format
    notes TEXT,
    present INT, -- Additional field for database compatibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
);

-- Step 8: Insert sample EMPLOYEES data
INSERT INTO employees (firstName, lastName, email, phoneNumber, designation, department, position, hireDate, salary, status, address, emergencyContact, emergencyPhone, fullName) VALUES
('John', 'Smith', 'john.smith@company.com', '1234567890', 'Senior Developer', 'Engineering', 'Software Developer', '2023-01-15', 25000.00, 'ACTIVE', 'Bangalore, Karnataka', 'Jane Smith', '9876543210', 'John Smith'),
('Alice', 'Johnson', 'alice.johnson@company.com', '2345678901', 'Manager', 'HR', 'HR Manager', '2022-06-01', 30000.00, 'ACTIVE', 'Mumbai, Maharashtra', 'Bob Johnson', '8765432109', 'Alice Johnson'),
('Mike', 'Davis', 'mike.davis@company.com', '3456789012', 'Developer', 'Engineering', 'Software Developer', '2023-03-20', 22000.00, 'ACTIVE', 'Chennai, Tamil Nadu', 'Sarah Davis', '7654321096', 'Mike Davis'),
('Emma', 'Wilson', 'emma.wilson@company.com', '4567890123', 'Analyst', 'Finance', 'Financial Analyst', '2023-05-10', 28000.00, 'ACTIVE', 'Delhi, Delhi', 'Tom Wilson', '6543210987', 'Emma Wilson'),
('David', 'Brown', 'david.brown@company.com', '5678901234', 'Assistant', 'Admin', 'Admin Assistant', '2023-02-28', 20000.00, 'ACTIVE', 'Kolkata, West Bengal', 'Lisa Brown', '5432109876', 'David Brown');

-- Step 9: Insert sample USER_ACCOUNTS data
INSERT INTO user_accounts (username, password, role, employeeId, email, phoneNumber, firstName, lastName, department, status, lastLoginDate, createdAt, createdBy, notes) VALUES
('john.smith@company.com', 'password123', 'EMPLOYEE', 1, 'john.smith@company.com', '1234567890', 'John', 'Smith', 'Engineering', 'ACTIVE', '2024-01-15', '2023-01-15', 'HR Manager', 'Active employee'),
('alice.johnson@company.com', 'password123', 'ADMIN', 2, 'alice.johnson@company.com', '2345678901', 'Alice', 'Johnson', 'HR', 'ACTIVE', '2024-01-15', '2022-06-01', 'System', 'HR Manager'),
('mike.davis@company.com', 'password123', 'EMPLOYEE', 3, 'mike.davis@company.com', '3456789012', 'Mike', 'Davis', 'Engineering', 'ACTIVE', '2024-01-15', '2023-03-20', 'HR Manager', 'Active employee'),
('emma.wilson@company.com', 'password123', 'EMPLOYEE', 4, 'emma.wilson@company.com', '4567890123', 'Emma', 'Wilson', 'Finance', 'ACTIVE', '2024-01-15', '2023-05-10', 'HR Manager', 'Active employee'),
('david.brown@company.com', 'password123', 'EMPLOYEE', 5, 'david.brown@company.com', '5678901234', 'David', 'Brown', 'Admin', 'ACTIVE', '2024-01-15', '2023-02-28', 'HR Manager', 'Active employee');

-- Step 10: Insert sample PAYROLLS data
INSERT INTO payrolls (payDate, basicSalary, totalEarnings, totalDeductions, netSalary, employeeId, employeeName, department, payPeriod, status, paymentMethod, processedDate, processedBy, notes) VALUES
('2024-01-31', 25000.00, 25000.00, 6000.00, 19000.00, 1, 'John Smith', 'Engineering', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-31', 'HR Manager', 'Monthly salary payment'),
('2024-02-29', 25000.00, 25000.00, 6000.00, 19000.00, 1, 'John Smith', 'Engineering', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-29', 'HR Manager', 'Monthly salary payment'),
('2024-01-31', 30000.00, 30000.00, 7200.00, 22800.00, 2, 'Alice Johnson', 'HR', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-31', 'HR Manager', 'Monthly salary payment'),
('2024-02-29', 30000.00, 30000.00, 7200.00, 22800.00, 2, 'Alice Johnson', 'HR', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-29', 'HR Manager', 'Monthly salary payment'),
('2024-01-31', 22000.00, 22000.00, 5280.00, 16720.00, 3, 'Mike Davis', 'Engineering', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-31', 'HR Manager', 'Monthly salary payment'),
('2024-02-29', 22000.00, 22000.00, 5280.00, 16720.00, 3, 'Mike Davis', 'Engineering', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-29', 'HR Manager', 'Monthly salary payment'),
('2024-01-31', 28000.00, 28000.00, 6720.00, 21280.00, 4, 'Emma Wilson', 'Finance', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-31', 'HR Manager', 'Monthly salary payment'),
('2024-02-29', 28000.00, 28000.00, 6720.00, 21280.00, 4, 'Emma Wilson', 'Finance', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-29', 'HR Manager', 'Monthly salary payment'),
('2024-01-31', 20000.00, 20000.00, 4800.00, 15200.00, 5, 'David Brown', 'Admin', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-31', 'HR Manager', 'Monthly salary payment'),
('2024-02-29', 20000.00, 20000.00, 4800.00, 15200.00, 5, 'David Brown', 'Admin', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-29', 'HR Manager', 'Monthly salary payment');

-- Step 11: Insert sample DEDUCTIONS data
INSERT INTO deductions (employeeId, employeeName, department, month, year, tax, pf, other, totalDeduction, deductionType, status, description, createdAt, approvedBy, notes, payrollId) VALUES
('1', 'John Smith', 'Engineering', 'Jan 2024', 2024, 2500.00, 3000.00, 500.00, 6000.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-01-01', 'HR Manager', 'Standard deductions', 1),
('1', 'John Smith', 'Engineering', 'Feb 2024', 2024, 2500.00, 3000.00, 500.00, 6000.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-02-01', 'HR Manager', 'Standard deductions', 2),
('2', 'Alice Johnson', 'HR', 'Jan 2024', 2024, 3000.00, 3600.00, 600.00, 7200.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-01-01', 'HR Manager', 'Standard deductions', 3),
('2', 'Alice Johnson', 'HR', 'Feb 2024', 2024, 3000.00, 3600.00, 600.00, 7200.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-02-01', 'HR Manager', 'Standard deductions', 4),
('3', 'Mike Davis', 'Engineering', 'Jan 2024', 2024, 2200.00, 2640.00, 440.00, 5280.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-01-01', 'HR Manager', 'Standard deductions', 5),
('3', 'Mike Davis', 'Engineering', 'Feb 2024', 2024, 2200.00, 2640.00, 440.00, 5280.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-02-01', 'HR Manager', 'Standard deductions', 6),
('4', 'Emma Wilson', 'Finance', 'Jan 2024', 2024, 2800.00, 3360.00, 560.00, 6720.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-01-01', 'HR Manager', 'Standard deductions', 7),
('4', 'Emma Wilson', 'Finance', 'Feb 2024', 2024, 2800.00, 3360.00, 560.00, 6720.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-02-01', 'HR Manager', 'Standard deductions', 8),
('5', 'David Brown', 'Admin', 'Jan 2024', 2024, 2000.00, 2400.00, 400.00, 4800.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-01-01', 'HR Manager', 'Standard deductions', 9),
('5', 'David Brown', 'Admin', 'Feb 2024', 2024, 2000.00, 2400.00, 400.00, 4800.00, 'TAX', 'APPROVED', 'Monthly deductions', '2024-02-01', 'HR Manager', 'Standard deductions', 10);

-- Step 12: Insert sample ATTENDANCE data
INSERT INTO attendance (employeeId, employeeName, department, month, year, presentDays, absentDays, leaveDays, totalWorkingDays, attendancePercentage, lateArrivals, earlyDepartures, lastAttendanceDate, createdAt, notes, present) VALUES
('1', 'John Smith', 'Engineering', 'Jan 2024', 2024, 20, 2, 0, 22, 90.91, 1, 0, '2024-01-31', '2024-01-01', 'Good attendance', 20),
('1', 'John Smith', 'Engineering', 'Feb 2024', 2024, 19, 3, 0, 22, 86.36, 2, 1, '2024-02-29', '2024-02-01', 'Good attendance', 19),
('2', 'Alice Johnson', 'HR', 'Jan 2024', 2024, 22, 0, 0, 22, 100.00, 0, 0, '2024-01-31', '2024-01-01', 'Perfect attendance', 22),
('2', 'Alice Johnson', 'HR', 'Feb 2024', 2024, 21, 1, 0, 22, 95.45, 0, 0, '2024-02-29', '2024-02-01', 'Excellent attendance', 21),
('3', 'Mike Davis', 'Engineering', 'Jan 2024', 2024, 18, 4, 0, 22, 81.82, 3, 2, '2024-01-31', '2024-01-01', 'Average attendance', 18),
('3', 'Mike Davis', 'Engineering', 'Feb 2024', 2024, 20, 2, 0, 22, 90.91, 1, 0, '2024-02-29', '2024-02-01', 'Good attendance', 20),
('4', 'Emma Wilson', 'Finance', 'Jan 2024', 2024, 21, 1, 0, 22, 95.45, 0, 0, '2024-01-31', '2024-01-01', 'Excellent attendance', 21),
('4', 'Emma Wilson', 'Finance', 'Feb 2024', 2024, 19, 3, 0, 22, 86.36, 1, 1, '2024-02-29', '2024-02-01', 'Good attendance', 19),
('5', 'David Brown', 'Admin', 'Jan 2024', 2024, 17, 5, 0, 22, 77.27, 4, 3, '2024-01-31', '2024-01-01', 'Needs improvement', 17),
('5', 'David Brown', 'Admin', 'Feb 2024', 2024, 18, 4, 0, 22, 81.82, 2, 1, '2024-02-29', '2024-02-01', 'Improving attendance', 18);

-- Step 13: Verification
SELECT 'DATABASE SCHEMA CREATED SUCCESSFULLY!' as status;
SELECT 'EMPLOYEES' as table_name, COUNT(*) as count FROM employees;
SELECT 'USER_ACCOUNTS' as table_name, COUNT(*) as count FROM user_accounts;
SELECT 'PAYROLLS' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'DEDUCTIONS' as table_name, COUNT(*) as count FROM deductions;
SELECT 'ATTENDANCE' as table_name, COUNT(*) as count FROM attendance;

-- Show sample data from each table
SELECT 'SAMPLE EMPLOYEES' as info;
SELECT id, firstName, lastName, email, department, salary, status FROM employees LIMIT 3;

SELECT 'SAMPLE USER ACCOUNTS' as info;
SELECT id, username, role, employeeId, status FROM user_accounts LIMIT 3;

SELECT 'SAMPLE PAYROLLS' as info;
SELECT id, employeeName, payPeriod, netSalary, status FROM payrolls LIMIT 3;

SELECT 'SAMPLE DEDUCTIONS' as info;
SELECT id, employeeName, month, totalDeduction, status FROM deductions LIMIT 3;

SELECT 'SAMPLE ATTENDANCE' as info;
SELECT id, employeeName, month, presentDays, attendancePercentage FROM attendance LIMIT 3;

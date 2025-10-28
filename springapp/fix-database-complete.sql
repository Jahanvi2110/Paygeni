-- ===================================================================
-- COMPLETE DATABASE FIX FOR SPRINGAPP
-- This script fixes all database issues and ensures proper synchronization
-- between admin dashboard and employee dashboard
-- ===================================================================

USE springapp;

-- ===================================================================
-- STEP 1: BACKUP EXISTING DATA (if any)
-- ===================================================================
-- Create backup tables before making changes
CREATE TABLE IF NOT EXISTS employees_backup AS SELECT * FROM employees;
CREATE TABLE IF NOT EXISTS users_backup AS SELECT * FROM users;
CREATE TABLE IF NOT EXISTS attendance_backup AS SELECT * FROM attendance;
CREATE TABLE IF NOT EXISTS deductions_backup AS SELECT * FROM deductions;
CREATE TABLE IF NOT EXISTS payrolls_backup AS SELECT * FROM payrolls;

-- ===================================================================
-- STEP 2: DROP EXISTING TABLES (in correct order due to foreign keys)
-- ===================================================================
DROP TABLE IF EXISTS deductions;
DROP TABLE IF EXISTS salary_components;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS payrolls;
DROP TABLE IF EXISTS user_accounts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS employees;

-- ===================================================================
-- STEP 3: CREATE EMPLOYEES TABLE (matches Employee model exactly)
-- ===================================================================
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    designation VARCHAR(100),
    department VARCHAR(100),
    position VARCHAR(200),
    hire_date DATE,
    salary DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    address TEXT,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_department (department)
);

-- ===================================================================
-- STEP 4: CREATE USERS TABLE (matches User model exactly)
-- ===================================================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE',
    employee_id BIGINT NOT NULL,
    employee_ref_id BIGINT,
    email VARCHAR(255),
    phone_number VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    department VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_login_date DATE,
    created_at DATE DEFAULT (CURDATE()),
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    notes TEXT,
    
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_username (username),
    INDEX idx_employee_id (employee_id),
    INDEX idx_role (role)
);

-- ===================================================================
-- STEP 5: CREATE PAYROLLS TABLE (matches Payroll model exactly)
-- ===================================================================
CREATE TABLE payrolls (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payroll_id VARCHAR(50) UNIQUE NOT NULL,
    employee_id BIGINT NOT NULL,
    employee_name VARCHAR(200) NOT NULL,
    department VARCHAR(100),
    pay_period VARCHAR(50) NOT NULL,
    basic_salary DECIMAL(10,2) NOT NULL,
    allowances DECIMAL(10,2) DEFAULT 0.0,
    overtime DECIMAL(10,2) DEFAULT 0.0,
    bonus DECIMAL(10,2) DEFAULT 0.0,
    total_earnings DECIMAL(10,2) NOT NULL,
    tax_deduction DECIMAL(10,2) DEFAULT 0.0,
    insurance_deduction DECIMAL(10,2) DEFAULT 0.0,
    loan_deduction DECIMAL(10,2) DEFAULT 0.0,
    other_deductions DECIMAL(10,2) DEFAULT 0.0,
    attendance_deduction DECIMAL(10,2) DEFAULT 0.0,
    leave_deduction DECIMAL(10,2) DEFAULT 0.0,
    total_deductions DECIMAL(10,2) NOT NULL,
    net_salary DECIMAL(10,2) NOT NULL,
    pay_date DATE,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    processed_date DATE,
    processed_by VARCHAR(100),
    notes TEXT,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_status (status),
    INDEX idx_pay_period (pay_period)
);

-- ===================================================================
-- STEP 6: CREATE ATTENDANCE TABLE (matches Attendance model exactly)
-- ===================================================================
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    employee_photo VARCHAR(500),
    department VARCHAR(100),
    month VARCHAR(50) NOT NULL,
    year INTEGER,
    present_days INTEGER,
    present INTEGER DEFAULT 0,
    absent_days INTEGER,
    leave_days INTEGER,
    total_working_days INTEGER,
    attendance_percentage DECIMAL(5,2),
    late_arrivals INTEGER,
    early_departures INTEGER,
    overtime_hours INTEGER,
    last_attendance_date VARCHAR(50),
    created_at DATE DEFAULT (CURDATE()),
    notes TEXT,
    employee_ref_id BIGINT,
    
    -- Additional fields for daily attendance tracking
    date DATE,
    status VARCHAR(50),
    check_in_time VARCHAR(20),
    check_out_time VARCHAR(20),
    hours_worked DECIMAL(4,2),
    
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_month_year (month, year)
);

-- ===================================================================
-- STEP 7: CREATE DEDUCTIONS TABLE (matches Deduction model exactly)
-- ===================================================================
CREATE TABLE deductions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    employee_photo VARCHAR(500),
    department VARCHAR(100),
    month VARCHAR(50) NOT NULL,
    year INTEGER,
    tax DECIMAL(10,2),
    pf DECIMAL(10,2),
    esi DECIMAL(10,2),
    professional_tax DECIMAL(10,2),
    loan_deduction DECIMAL(10,2),
    advance_deduction DECIMAL(10,2),
    other DECIMAL(10,2),
    total_deduction DECIMAL(10,2),
    gross_salary DECIMAL(10,2),
    net_salary DECIMAL(10,2),
    deduction_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'PENDING',
    description TEXT,
    created_at DATE DEFAULT (CURDATE()),
    approved_by VARCHAR(100),
    notes TEXT,
    payroll_ref_id BIGINT,
    employee_ref_id BIGINT,
    
    FOREIGN KEY (payroll_ref_id) REFERENCES payrolls(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_payroll_ref_id (payroll_ref_id)
);

-- ===================================================================
-- STEP 8: CREATE SALARY_COMPONENTS TABLE
-- ===================================================================
CREATE TABLE salary_components (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    component_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payroll_id BIGINT NOT NULL,
    payroll_ref_id BIGINT,
    component_type VARCHAR(50),
    description TEXT,
    is_taxable BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    
    FOREIGN KEY (payroll_ref_id) REFERENCES payrolls(id) ON DELETE CASCADE,
    INDEX idx_payroll_id (payroll_id),
    INDEX idx_component_type (component_type)
);

-- ===================================================================
-- STEP 9: INSERT SAMPLE EMPLOYEES DATA
-- ===================================================================
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, position, hire_date, salary, status, address, emergency_contact, emergency_phone) VALUES
('John', 'Smith', 'john.smith@company.com', '1234567890', 'Senior Developer', 'Engineering', 'Software Developer', '2023-01-15', 25000.00, 'ACTIVE', '123 Main St, City', 'Jane Smith', '9876543210'),
('Alice', 'Johnson', 'alice.johnson@company.com', '2345678901', 'Manager', 'Human Resources', 'HR Manager', '2022-06-01', 30000.00, 'ACTIVE', '456 Oak Ave, City', 'Bob Johnson', '8765432109'),
('Mike', 'Davis', 'mike.davis@company.com', '3456789012', 'Developer', 'Engineering', 'Software Developer', '2023-03-20', 22000.00, 'ACTIVE', '789 Pine Rd, City', 'Sarah Davis', '7654321098'),
('Emma', 'Wilson', 'emma.wilson@company.com', '4567890123', 'Analyst', 'Finance', 'Financial Analyst', '2023-05-10', 28000.00, 'ACTIVE', '321 Elm St, City', 'Tom Wilson', '6543210987'),
('David', 'Brown', 'david.brown@company.com', '5678901234', 'Assistant', 'Administration', 'Admin Assistant', '2023-02-28', 20000.00, 'ACTIVE', '654 Maple Ave, City', 'Lisa Brown', '5432109876'),
('Sarah', 'Johnson', 'sarah.johnson@company.com', '98765 43210', 'Specialist', 'Marketing', 'Marketing Specialist', '2022-08-15', 45000.00, 'ACTIVE', '789 Marketing St', 'Marketing Manager', '9876543210'),
('Michael', 'Chen', 'michael.chen@company.com', '98765 43211', 'Engineer', 'Engineering', 'Senior Engineer', '2021-12-01', 55000.00, 'ACTIVE', '456 Tech Ave', 'Engineering Manager', '9876543211'),
('Priya', 'Sharma', 'priya.sharma@company.com', '98765 43212', 'Coordinator', 'Human Resources', 'HR Coordinator', '2023-01-10', 42000.00, 'ACTIVE', '321 HR Blvd', 'HR Manager', '9876543212');

-- ===================================================================
-- STEP 10: INSERT SAMPLE USERS DATA
-- ===================================================================
INSERT INTO users (username, password, role, employee_id, employee_ref_id, email, phone_number, first_name, last_name, department, status, created_at, created_by) VALUES
('admin@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', 1, 1, 'admin@company.com', '1234567890', 'Admin', 'User', 'Administration', 'ACTIVE', '2023-01-01', 'SYSTEM'),
('john.smith@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 1, 1, 'john.smith@company.com', '1234567890', 'John', 'Smith', 'Engineering', 'ACTIVE', '2023-01-15', 'SYSTEM'),
('alice.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'MANAGER', 2, 2, 'alice.johnson@company.com', '2345678901', 'Alice', 'Johnson', 'Human Resources', 'ACTIVE', '2022-06-01', 'SYSTEM'),
('mike.davis@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 3, 3, 'mike.davis@company.com', '3456789012', 'Mike', 'Davis', 'Engineering', 'ACTIVE', '2023-03-20', 'SYSTEM'),
('emma.wilson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 4, 4, 'emma.wilson@company.com', '4567890123', 'Emma', 'Wilson', 'Finance', 'ACTIVE', '2023-05-10', 'SYSTEM'),
('david.brown@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 5, 5, 'david.brown@company.com', '5678901234', 'David', 'Brown', 'Administration', 'ACTIVE', '2023-02-28', 'SYSTEM'),
('sarah.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 6, 6, 'sarah.johnson@company.com', '98765 43210', 'Sarah', 'Johnson', 'Marketing', 'ACTIVE', '2022-08-15', 'SYSTEM'),
('michael.chen@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 7, 7, 'michael.chen@company.com', '98765 43211', 'Michael', 'Chen', 'Engineering', 'ACTIVE', '2021-12-01', 'SYSTEM'),
('priya.sharma@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 8, 8, 'priya.sharma@company.com', '98765 43212', 'Priya', 'Sharma', 'Human Resources', 'ACTIVE', '2023-01-10', 'SYSTEM');

-- ===================================================================
-- STEP 11: INSERT SAMPLE PAYROLLS DATA
-- ===================================================================
INSERT INTO payrolls (payroll_id, employee_id, employee_name, department, pay_period, basic_salary, allowances, overtime, bonus, total_earnings, tax_deduction, insurance_deduction, loan_deduction, other_deductions, total_deductions, net_salary, pay_date, status, payment_method, notes) VALUES
('PAY001', 1, 'John Smith', 'Engineering', 'Dec 2024', 25000.00, 5000.00, 2000.00, 1000.00, 33000.00, 3000.00, 1000.00, 500.00, 500.00, 5000.00, 28000.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY002', 2, 'Alice Johnson', 'Human Resources', 'Dec 2024', 30000.00, 6000.00, 1000.00, 2000.00, 39000.00, 4000.00, 1200.00, 800.00, 600.00, 6600.00, 32400.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY003', 3, 'Mike Davis', 'Engineering', 'Dec 2024', 22000.00, 4000.00, 1500.00, 500.00, 28000.00, 2500.00, 800.00, 400.00, 300.00, 4000.00, 24000.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY004', 4, 'Emma Wilson', 'Finance', 'Dec 2024', 28000.00, 5000.00, 1000.00, 1500.00, 35500.00, 3500.00, 1000.00, 600.00, 400.00, 5500.00, 30000.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY005', 5, 'David Brown', 'Administration', 'Dec 2024', 20000.00, 3000.00, 500.00, 1000.00, 24500.00, 2000.00, 600.00, 300.00, 200.00, 3100.00, 21400.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY006', 6, 'Sarah Johnson', 'Marketing', 'Dec 2024', 45000.00, 8000.00, 2000.00, 2000.00, 57000.00, 6000.00, 1500.00, 1000.00, 800.00, 9300.00, 47700.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY007', 7, 'Michael Chen', 'Engineering', 'Dec 2024', 55000.00, 10000.00, 3000.00, 3000.00, 71000.00, 8000.00, 2000.00, 1500.00, 1000.00, 12500.00, 58500.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('PAY008', 8, 'Priya Sharma', 'Human Resources', 'Dec 2024', 42000.00, 7000.00, 1000.00, 1500.00, 51500.00, 5000.00, 1200.00, 800.00, 600.00, 7600.00, 43900.00, '2024-12-31', 'PENDING', 'BANK_TRANSFER', 'December payroll');

-- ===================================================================
-- STEP 12: INSERT SAMPLE ATTENDANCE DATA
-- ===================================================================
INSERT INTO attendance (employee_id, employee_name, department, month, year, present_days, absent_days, leave_days, total_working_days, attendance_percentage, late_arrivals, early_departures, overtime_hours, last_attendance_date, notes, employee_ref_id) VALUES
('EMP001', 'John Smith', 'Engineering', 'December', 2024, 22, 1, 0, 23, 95.65, 2, 1, 15, '2024-12-20', 'Good attendance', 1),
('EMP002', 'Alice Johnson', 'Human Resources', 'December', 2024, 21, 2, 0, 23, 91.30, 1, 0, 8, '2024-12-20', 'Regular attendance', 2),
('EMP003', 'Mike Davis', 'Engineering', 'December', 2024, 19, 4, 0, 23, 82.61, 3, 2, 12, '2024-12-19', 'Some missed days', 3),
('EMP004', 'Emma Wilson', 'Finance', 'December', 2024, 23, 0, 0, 23, 100.00, 0, 0, 20, '2024-12-20', 'Perfect attendance', 4),
('EMP005', 'David Brown', 'Administration', 'December', 2024, 20, 3, 0, 23, 86.96, 1, 1, 5, '2024-12-19', 'Average attendance', 5),
('EMP006', 'Sarah Johnson', 'Marketing', 'December', 2024, 21, 2, 0, 23, 91.30, 0, 0, 10, '2024-12-20', 'Good attendance', 6),
('EMP007', 'Michael Chen', 'Engineering', 'December', 2024, 22, 1, 0, 23, 95.65, 1, 0, 25, '2024-12-20', 'Excellent attendance', 7),
('EMP008', 'Priya Sharma', 'Human Resources', 'December', 2024, 20, 3, 0, 23, 86.96, 2, 1, 8, '2024-12-19', 'Good attendance', 8);

-- ===================================================================
-- STEP 13: INSERT SAMPLE DEDUCTIONS DATA
-- ===================================================================
INSERT INTO deductions (employee_id, employee_name, department, month, year, tax, pf, esi, professional_tax, loan_deduction, advance_deduction, other, total_deduction, gross_salary, net_salary, status, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES
('EMP001', 'John Smith', 'Engineering', 'December', 2024, 3000.00, 3000.00, 500.00, 200.00, 500.00, 0.00, 500.00, 7700.00, 33000.00, 25300.00, 'APPROVED', 'HR Manager', 'Standard deductions', 1, 1),
('EMP002', 'Alice Johnson', 'Human Resources', 'December', 2024, 4000.00, 3600.00, 600.00, 200.00, 800.00, 0.00, 600.00, 9800.00, 39000.00, 29200.00, 'APPROVED', 'HR Manager', 'Standard deductions', 2, 2),
('EMP003', 'Mike Davis', 'Engineering', 'December', 2024, 2500.00, 2640.00, 400.00, 200.00, 400.00, 0.00, 300.00, 6440.00, 28000.00, 21560.00, 'APPROVED', 'HR Manager', 'Standard deductions', 3, 3),
('EMP004', 'Emma Wilson', 'Finance', 'December', 2024, 3500.00, 3360.00, 500.00, 200.00, 600.00, 0.00, 400.00, 8560.00, 35500.00, 26940.00, 'APPROVED', 'HR Manager', 'Standard deductions', 4, 4),
('EMP005', 'David Brown', 'Administration', 'December', 2024, 2000.00, 2400.00, 300.00, 200.00, 300.00, 0.00, 200.00, 5400.00, 24500.00, 19100.00, 'APPROVED', 'HR Manager', 'Standard deductions', 5, 5),
('EMP006', 'Sarah Johnson', 'Marketing', 'December', 2024, 6000.00, 5400.00, 900.00, 200.00, 1000.00, 0.00, 800.00, 14300.00, 57000.00, 42700.00, 'APPROVED', 'HR Manager', 'Standard deductions', 6, 6),
('EMP007', 'Michael Chen', 'Engineering', 'December', 2024, 8000.00, 6600.00, 1100.00, 200.00, 1500.00, 0.00, 1000.00, 18400.00, 71000.00, 52600.00, 'APPROVED', 'HR Manager', 'Standard deductions', 7, 7),
('EMP008', 'Priya Sharma', 'Human Resources', 'December', 2024, 5000.00, 5040.00, 800.00, 200.00, 800.00, 0.00, 600.00, 12440.00, 51500.00, 39060.00, 'APPROVED', 'HR Manager', 'Standard deductions', 8, 8);

-- ===================================================================
-- STEP 14: VERIFICATION QUERIES
-- ===================================================================
SELECT '=== DATABASE FIXED SUCCESSFULLY ===' as Status;
SELECT '=== TABLES CREATED ===' as Status;
SHOW TABLES;

SELECT '=== EMPLOYEES DATA ===' as Status;
SELECT id, first_name, last_name, email, department, salary, status FROM employees;

SELECT '=== USERS DATA ===' as Status;
SELECT id, username, role, employee_id, email, first_name, last_name, department FROM users;

SELECT '=== PAYROLLS DATA ===' as Status;
SELECT id, employee_name, department, net_salary, status FROM payrolls;

SELECT '=== ATTENDANCE DATA ===' as Status;
SELECT id, employee_name, department, present_days, absent_days, attendance_percentage FROM attendance;

SELECT '=== DEDUCTIONS DATA ===' as Status;
SELECT id, employee_name, department, total_deduction, status FROM deductions;

-- ===================================================================
-- STEP 15: FINAL VERIFICATION
-- ===================================================================
SELECT '=== FINAL VERIFICATION ===' as Status;
SELECT 
    'employees' as table_name, 
    COUNT(*) as record_count 
FROM employees
UNION ALL
SELECT 
    'users' as table_name, 
    COUNT(*) as record_count 
FROM users
UNION ALL
SELECT 
    'payrolls' as table_name, 
    COUNT(*) as record_count 
FROM payrolls
UNION ALL
SELECT 
    'attendance' as table_name, 
    COUNT(*) as record_count 
FROM attendance
UNION ALL
SELECT 
    'deductions' as table_name, 
    COUNT(*) as record_count 
FROM deductions;

COMMIT;

SELECT '=== DATABASE FIX COMPLETED SUCCESSFULLY ===' as Status;

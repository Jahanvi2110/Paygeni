-- ===================================================================
-- DATABASE SCHEMA SYNC: FRONTEND ↔ BACKEND COLUMNS
-- ===================================================================
-- This script ensures Angular frontend models match Spring Boot backend
-- database tables exactly with all required columns.

USE springapp;

-- ===================================================================
-- 1. EMPLOYEES TABLE (matches Angular Employee interface)
-- ===================================================================
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
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
-- 2. USERS TABLE (matches Angular UserAccount interface)
-- ===================================================================
DROP TABLE IF EXISTS users;
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
-- 3. PAYROLLS TABLE (matches Angular Payroll interface)
-- ===================================================================
DROP TABLE IF EXISTS payrolls;
CREATE TABLE payrolls (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pay_date VARCHAR(50) NOT NULL,
    basic_salary DECIMAL(10,2) NOT NULL,
    total_earnings DECIMAL(10,2) NOT NULL,
    total_deductions DECIMAL(10,2) NOT NULL,
    net_salary DECIMAL(10,2) NOT NULL,
    employee_id BIGINT NOT NULL,
    employee_ref_id BIGINT,
    employee_name VARCHAR(200),
    department VARCHAR(100),
    pay_period VARCHAR(50),
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    processed_date DATE,
    processed_by VARCHAR(100),
    notes TEXT,
    
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_status (status),
    INDEX idx_pay_period (pay_period)
);

-- ===================================================================
-- 4. ATTENDANCE TABLE (matches Angular AttendanceRecord interface)
-- ===================================================================
DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    employee_photo VARCHAR(500),
    department VARCHAR(100),
    month VARCHAR(50) NOT NULL,
    year INTEGER,
    present_days INTEGER,
    absent_days INTEGER,
    present INTEGER DEFAULT 0,
    leave_days INTEGER DEFAULT 0,
    total_working_days INTEGER,
    attendance_percentage DECIMAL(5,2),
    late_arrivals INTEGER DEFAULT 0,
    early_departures INTEGER DEFAULT 0,
    last_attendance_date VARCHAR(50),
    created_at DATE DEFAULT (CURDATE()),
    notes TEXT,
    employee_ref_id BIGINT,
    
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_month_year (month, year)
);

-- ===================================================================
-- 5. SALARY_COMPONENTS TABLE (matches Angular SalaryComponent interface)
-- ===================================================================
DROP TABLE IF EXISTS salary_components;
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
-- 6. DEDUCTIONS TABLE (matches Angular Deduction interface)
-- ===================================================================
DROP TABLE IF EXISTS deductions;
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
    other DECIMAL(10,2),
    total_deduction DECIMAL(10,2),
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
-- 7. INSERT SAMPLE DATA FOR TESTING
-- ===================================================================

-- Insert sample employees
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, position, hire_date, birthday, salary, status, address, emergency_contact, emergency_phone) VALUES
('John', 'Smith', 'john.smith@company.com', '1234567890', 'Senior Developer', 'Engineering', 'Software Developer', '2023-01-15', 25000.00, 'ACTIVE', '123 Main St, City', 'Jane Smith', '9876543210'),
('Alice', 'Johnson', 'alice.johnson@company.com', '2345678901', 'Manager', 'HR', 'HR Manager', '2022-06-01', 30000.00, 'ACTIVE', '456 Oak Ave, City', 'Bob Johnson', '8765432109'),
('Mike', 'Davis', 'mike.davis@company.com', '3456789012', 'Developer', 'Engineering', 'Software Developer', '2023-03-20', 22000.00, 'ACTIVE', '789 Pine Rd, City', 'Sarah Davis', '7654321098'),
('Emma', 'Wilson', 'emma.wilson@company.com', '4567890123', 'Analyst', 'Finance', 'Financial Analyst', '2023-05-10', 28000.00, 'ACTIVE', '321 Elm St, City', 'Tom Wilson', '6543210987'),
('David', 'Brown', 'david.brown@company.com', '5678901234', 'Assistant', 'Admin', 'Admin Assistant', '2023-02-28', 20000.00, 'ACTIVE', '654 Maple Ave, City', 'Lisa Brown', '5432109876');

-- Insert sample users
INSERT INTO users (username, password, role, employee_id, employee_ref_id, email, phone_number, first_name, last_name, department, status, created_at, created_by) VALUES
('john.smith@company.com', '$2a$10$encryptedpassword1', 'EMPLOYEE', 1, 1, 'john.smith@company.com', '1234567890', 'John', 'Smith', 'Engineering', 'ACTIVE', '2023-01-15', 'SYSTEM'),
('alice.johnson@company.com', '$2a$10$encryptedpassword2', 'MANAGER', 2, 2, 'alice.johnson@company.com', '2345678901', 'Alice', 'Johnson', 'HR', 'ACTIVE', '2022-06-01', 'SYSTEM'),
('mike.davis@company.com', '$2a$10$encryptedpassword3', 'EMPLOYEE', 3, 3, 'mike.davis@company.com', '3456789012', 'Mike', 'Davis', 'Engineering', 'ACTIVE', '2023-03-20', 'SYSTEM'),
('emma.wilson@company.com', '$2a$10$encryptedpassword4', 'EMPLOYEE', 4, 4, 'emma.wilson@company.com', '4567890123', 'Emma', 'Wilson', 'Finance', 'ACTIVE', '2023-05-10', 'SYSTEM'),
('david.brown@company.com', '$2a$10$encryptedpassword5', 'EMPLOYEE', 5, 5, 'david.brown@company.com', '5678901234', 'David', 'Brown', 'Admin', 'ACTIVE', '2023-02-28', 'SYSTEM');

-- Insert sample payrolls
INSERT INTO payrolls (pay_date, basic_salary, total_earnings, total_deductions, net_salary, employee_id, employee_ref_id, employee_name, department, pay_period, status, payment_method, notes) VALUES
('2024-12-31', 25000.00, 28000.00, 3000.00, 25000.00, 1, 1, 'John Smith', 'Engineering', 'Dec 2024', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('2024-12-31', 30000.00, 33000.00, 3500.00, 29500.00, 2, 2, 'Alice Johnson', 'HR', 'Dec 2024', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('2024-12-31', 22000.00, 24500.00, 2500.00, 22000.00, 3, 3, 'Mike Davis', 'Engineering', 'Dec 2024', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('2024-12-31', 28000.00, 31000.00, 3200.00, 27800.00, 4, 4, 'Emma Wilson', 'Finance', 'Dec 2024', 'PENDING', 'BANK_TRANSFER', 'December payroll'),
('2024-12-31', 20000.00, 22000.00, 2000.00, 20000.00, 5, 5, 'David Brown', 'Admin', 'Dec 2024', 'PENDING', 'BANK_TRANSFER', 'December payroll');

-- Insert sample attendance
INSERT INTO attendance (employee_id, employee_name, employee_photo, department, month, year, present_days, absent_days, present, leave_days, total_working_days, attendance_percentage, late_arrivals, early_departures, last_attendance_date, notes, employee_ref_id) VALUES
('EMP001', 'John Smith', NULL, 'Engineering', 'Dec 2024', 2024, 22, 3, 22, 1, 23, 95.65, 2, 1, '2024-12-20', 'Good attendance', 1),
('EMP002', 'Alice Johnson', NULL, 'HR', 'Dec 2024', 2024, 21, 2, 21, 0, 23, 91.30, 1, 0, '2024-12-20', 'Regular attendance', 2),
('EMP003', 'Mike Davis', NULL, 'Engineering', 'Dec 2024', 2024, 19, 4, 19, 2, 23, 82.61, 3, 2, '2024-12-19', 'Some missed days', 3),
('EMP004', 'Emma Wilson', NULL, 'Finance', 'Dec 2024', 2024, 23, 0, 23, 0, 23, 100.00, 0, 0, '2024-12-20', 'Perfect attendance', 4),
('EMP005', 'David Brown', NULL, 'Admin', 'Dec 2024', 2024, 20, 3, 20, 2, 23, 86.96, 1, 1, '2024-12-19', 'Average attendance', 5);

-- Insert sample salary components
INSERT INTO salary_components (component_name, amount, payroll_id, payroll_ref_id, component_type, description, is_taxable, status) VALUES
('Basic Salary', 25000.00, 1, 1, 'EARNING', 'Monthly basic salary', FALSE, 'ACTIVE'),
('HRA', 5000.00, 1, 1, 'EARNING', 'House rent allowance', TRUE, 'ACTIVE'),
('Bonus', 3000.00, 1, 1, 'EARNING', 'Performance bonus', TRUE, 'ACTIVE'),
('Tax Deduction', 2000.00, 1, 1, 'DEDUCTION', 'Income tax', TRUE, 'ACTIVE'),
('Health Insurance', 1000.00, 1, 1, 'DEDUCTION', 'Health insurance premium', FALSE, 'ACTIVE');

-- Insert sample deductions
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES
('EMP001', 'John Smith', NULL, 'Engineering', 'Dec 2024', 2024, 2000.00, 500.00, 500.00, 3000.00, 'TAX', 'APPROVED', 'Monthly deductions', 'SYSTEM', 'Regular deductions', 1, 1),
('EMP002', 'Alice Johnson', NULL, 'HR', 'Dec 2024', 2024, 2500.00, 600.00, 400.00, 3500.00, 'TAX', 'APPROVED', 'Monthly deductions', 'SYSTEM', 'Regular deductions', 2, 2),
('EMP003', 'Mike Davis', NULL, 'Engineering', 'Dec 2024', 2024, 1800.00, 450.00, 450.00, 2700.00, 'TAX', 'APPROVED', 'Monthly deductions', 'SYSTEM', 'Regular deductions', 3, 3),
('EMP004', 'Emma Wilson', NULL, 'Finance', 'Dec 2024', 2024, 2100.00, 525.00, 575.00, 3200.00, 'TAX', 'APPROVED', 'Monthly deductions', 'SYSTEM', 'Regular deductions', 4, 4),
('EMP005', 'David Brown', NULL, 'Admin', 'Dec 2024', 2024, 1600.00, 400.00, 400.00, 2400.00, 'TAX', 'APPROVED', 'Monthly deductions', 'SYSTEM', 'Regular deductions', 5, 5);

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================
SELECT '=== TABLES CREATED SUCCESSFULLY ===' as Status;
SHOW TABLES;

SELECT '=== EMPLOYEES DATA ===' as Status;
SELECT id, first_name, last_name, email, department, salary FROM employees LIMIT 5;

SELECT '=== USERS DATA ===' as Status;
SELECT id, username, role, employee_id, email FROM users LIMIT 5;

SELECT '=== PAYROLLS DATA ===' as Status;
SELECT id, employee_name, department, net_salary, status FROM payrolls LIMIT 5;

SELECT '=== ATTENDANCE DATA ===' as Status;
SELECT employee_name, department, present_days, absent_days, attendance_percentage FROM attendance LIMIT 5;

COMMIT;

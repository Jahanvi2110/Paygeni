-- ===================================================================
-- POPULATE EMPLOYEES TABLE WITH SAMPLE DATA
-- ===================================================================
-- This script directly populates the employees table with sample data

USE springapp;

-- Clear existing employee data to avoid duplicates
DELETE FROM employees;

-- Insert sample employees with all required fields
INSERT INTO employees (
    first_name, 
    last_name, 
    email, 
    phone_number, 
    designation, 
    department, 
    position, 
    hire_date, 
    salary, 
    status, 
    address, 
    emergency_contact, 
    emergency_phone
) VALUES 

-- Employee 1: John Smith (Senior Developer)
(
    'John',
    'Smith', 
    'john.smith@company.com',
    '1234567890',
    'Senior Developer',
    'Engineering',
    'Software Developer',
    '2023-01-15',
    25000.00,
    'ACTIVE',
    '123 Main Street, Bangalore, Karnataka',
    'Jane Smith',
    '9876543210'
),

-- Employee 2: Alice Johnson (HR Manager)
(
    'Alice',
    'Johnson',
    'alice.johnson@company.com', 
    '2345678901',
    'Manager',
    'HR',
    'HR Manager',
    '2022-06-01',
    30000.00,
    'ACTIVE',
    '456 Oak Avenue, Mumbai, Maharashtra',
    'Bob Johnson',
    '8765432109'
),

-- Employee 3: Mike Davis (Developer)
(
    'Mike',
    'Davis',
    'mike.davis@company.com',
    '3456789012',
    'Developer', 
    'Engineering',
    'Software Developer',
    '2023-03-20',
    22000.00,
    'ACTIVE',
    '789 Pine Road, Chennai, Tamil Nadu',
    'Sarah Davis',
    '7654321098'
),

-- Employee 4: Emma Wilson (Finance Analyst)
(
    'Emma',
    'Wilson',
    'emma.wilson@company.com',
    '4567890123',
    'Analyst',
    'Finance',
    'Financial Analyst',
    '2023-05-10',
    28000.00,
    'ACTIVE',
    '321 Elm Street, Delhi, Delhi',
    'Tom Wilson',
    '6543210987'
),

-- Employee 5: David Brown (Admin Assistant)
(
    'David',
    'Brown',
    'david.brown@company.com',
    '5678901234',
    'Assistant',
    'Admin', 
    'Admin Assistant',
    '2023-02-28',
    20000.00,
    'ACTIVE',
    '654 Maple Avenue, Kolkata, West Bengal',
    'Lisa Brown',
    '5432109876'
),

-- Employee 6: Sarah Miller (QA Engineer)
(
    'Sarah',
    'Miller',
    'sarah.miller@company.com',
    '6789012345',
    'Engineer',
    'QA',
    'QA Engineer',
    '2023-04-15',
    24000.00,
    'ACTIVE',
    '987 Cedar Lane, Pune, Maharashtra',
    'John Miller',
    '4321098765'
),

-- Employee 7: Alex Chen (DevOps Engineer)
(
    'Alex',
    'Chen',
    'alex.chen@company.com',
    '7890123456',
    'Engineer',
    'DevOps',
    'DevOps Engineer',
    '2023-07-01',
    26000.00,
    'ACTIVE',
    '147 Birch Street, Hyderabad, Telangana',
    'Maria Chen',
    '3210987654'
),

-- Employee 8: Lisa Garcia (Marketing Manager)
(
    'Lisa',
    'Garcia',
    'lisa.garcia@company.com',
    '8901234567',
    'Manager',
    'Marketing',
    'Marketing Manager',
    '2023-08-10',
    29000.00,
    'ACTIVE',
    '258 Spruce Drive, Ahmedabad, Gujarat',
    'Carlos Garcia',
    '2109876543'
),

-- Employee 9: Raj Patel (Business Analyst)
(
    'Raj',
    'Patel',
    'raj.patel@company.com',
    '9012345678',
    'Analyst',
    'Business',
    'Business Analyst',
    '2023-09-05',
    23000.00,
    'ACTIVE',
    '369 Oak Circle, Kochi, Kerala',
    'Priya Patel',
    '1098765432'
),

-- Employee 10: Maria Rodriguez (Sales Executive)
(
    'Maria',
    'Rodriguez',
    'maria.rodriguez@company.com',
    '0123456789',
    'Executive',
    'Sales',
    'Sales Executive',
    '2023-10-12',
    21000.00,
    'ACTIVE',
    '741 Pine Court, Indore, Madhya Pradesh',
    'Diego Rodriguez',
    '0987654321'
);

-- ===================================================================
-- POPULATE USERS TABLE (linked to employees)
-- ===================================================================

-- Clear existing users first
DELETE FROM users;

INSERT INTO users (
    username,
    password,
    role,
    employee_id,
    employee_ref_id,
    email,
    phone_number,
    first_name,
    last_name,
    department,
    status,
    created_at,
    created_by
) VALUES 

-- Create user accounts for all employees
('john.smith@company.com', '$2a$10$encryptedpassword1', 'EMPLOYEE', 1, 1, 'john.smith@company.com', '1234567890', 'John', 'Smith', 'Engineering', 'ACTIVE', '2023-01-15', 'SYSTEM'),
('alice.johnson@company.com', '$2a$10$encryptedpassword2', 'MANAGER', 2, 2, 'alice.johnson@company.com', '2345678901', 'Alice', 'Johnson', 'HR', 'ACTIVE', '2022-06-01', 'SYSTEM'),
('mike.davis@company.com', '$2a$10$encryptedpassword3', 'EMPLOYEE', 3, 3, 'mike.davis@company.com', '3456789012', 'Mike', 'Davis', 'Engineering', 'ACTIVE', '2023-03-20', 'SYSTEM'),
('emma.wilson@company.com', '$2a$10$encryptedpassword4', 'EMPLOYEE', 4, 4, 'emma.wilson@company.com', '4567890123', 'Emma', 'Wilson', 'Finance', 'ACTIVE', '2023-05-10', 'SYSTEM'),
('david.brown@company.com', '$2a$10$encryptedpassword5', 'EMPLOYEE', 5, 5, 'david.brown@company.com', '5678901234', 'David', 'Brown', 'Admin', 'ACTIVE', '2023-02-28', 'SYSTEM'),
('sarah.miller@company.com', '$2a$10$encryptedpassword6', 'EMPLOYEE', 6, 6, 'sarah.miller@company.com', '6789012345', 'Sarah', 'Miller', 'QA', 'ACTIVE', '2023-04-15', 'SYSTEM'),
('alex.chen@company.com', '$2a$10$encryptedpassword7', 'EMPLOYEE', 7, 7, 'alex.chen@company.com', '7890123456', 'Alex', 'Chen', 'DevOps', 'ACTIVE', '2023-07-01', 'SYSTEM'),
('lisa.garcia@company.com', '$2a$10$encryptedpassword8', 'MANAGER', 8, 8, 'lisa.garcia@company.com', '8901234567', 'Lisa', 'Garcia', 'Marketing', 'ACTIVE', '2023-08-10', 'SYSTEM'),
('raj.patel@company.com', '$2a$10$encryptedpassword9', 'EMPLOYEE', 9, 9, 'raj.patel@company.com', '9012345678', 'Raj', 'Patel', 'Business', 'ACTIVE', '2023-09-05', 'SYSTEM'),
('maria.rodriguez@company.com', '$2a$10$encryptedpassword10', 'EMPLOYEE', 10, 10, 'maria.rodriguez@company.com', '0123456789', 'Maria', 'Rodriguez', 'Sales', 'ACTIVE', '2023-10-12', 'SYSTEM');

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================

SELECT '=== EMPLOYEES TABLE POPULATED ===' as Status;

SELECT 
    'Total Employees:',
    COUNT(*) as count,
    'Average Salary:',
    AVG(salary) as avg_salary,
    'Departments:',
    COUNT(DISTINCT department) as dept_count
FROM employees;

SELECT '=== EMPLOYEE DETAILS ===' as Status;
SELECT 
    id,
    CONCAT(first_name, ' ', last_name) as full_name,
    email,
    department,
    position,
    salary,
    status,
    hire_date
FROM employees 
ORDER BY salary DESC;

SELECT '=== USERS TABLE POPULATED ===' as Status;
SELECT 
    id,
    username,
    role,
    employee_id,
    email,
    department
FROM users 
ORDER BY role, username;

COMMIT;

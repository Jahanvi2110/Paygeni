-- Insert sample employees into the database for testing
-- This will ensure users can login without needing to signup first

USE springapp;

-- Check current employees
SELECT 'CURRENT EMPLOYEES IN DATABASE:' as status;
SELECT id, firstName, lastName, email, phoneNumber, department, position, salary, status 
FROM employees 
ORDER BY id;

-- Insert sample employees for testing
INSERT INTO employees (
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    designation, 
    department, 
    position, 
    hireDate, 
    salary, 
    status, 
    address, 
    emergencyContact, 
    emergencyPhone
) VALUES 
(
    'John',
    'Smith',
    'john.smith@company.com',
    '9876543210',
    'Employee',
    'Engineering',
    'Software Developer',
    '2024-01-15',
    75000.00,
    'ACTIVE',
    '123 Main Street, City, State',
    'Jane Smith',
    '9876543211'
),
(
    'Sarah',
    'Johnson',
    'sarah.johnson@company.com',
    '9876543212',
    'Employee',
    'Human Resources',
    'HR Manager',
    '2024-02-01',
    65000.00,
    'ACTIVE',
    '456 Oak Avenue, City, State',
    'Mike Johnson',
    '9876543213'
),
(
    'Michael',
    'Brown',
    'michael.brown@company.com',
    '9876543214',
    'Employee',
    'Engineering',
    'Senior Developer',
    '2024-01-20',
    85000.00,
    'ACTIVE',
    '789 Pine Road, City, State',
    'Lisa Brown',
    '9876543215'
),
(
    'Emily',
    'Davis',
    'emily.davis@company.com',
    '9876543216',
    'Employee',
    'Design',
    'UI/UX Designer',
    '2024-03-01',
    60000.00,
    'ACTIVE',
    '321 Elm Street, City, State',
    'Tom Davis',
    '9876543217'
),
(
    'David',
    'Wilson',
    'david.wilson@company.com',
    '9876543218',
    'Employee',
    'Engineering',
    'DevOps Engineer',
    '2024-02-15',
    80000.00,
    'ACTIVE',
    '654 Maple Drive, City, State',
    'Anna Wilson',
    '9876543219'
);

-- Insert corresponding user accounts
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES 
('john.smith@company.com', 'password123', 'employee', (SELECT id FROM employees WHERE email = 'john.smith@company.com')),
('sarah.johnson@company.com', 'password123', 'employee', (SELECT id FROM employees WHERE email = 'sarah.johnson@company.com')),
('michael.brown@company.com', 'password123', 'employee', (SELECT id FROM employees WHERE email = 'michael.brown@company.com')),
('emily.davis@company.com', 'password123', 'employee', (SELECT id FROM employees WHERE email = 'emily.davis@company.com')),
('david.wilson@company.com', 'password123', 'employee', (SELECT id FROM employees WHERE email = 'david.wilson@company.com'));

-- Insert Admin User
INSERT INTO employees (
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    designation, 
    department, 
    position, 
    hireDate, 
    salary, 
    status, 
    address, 
    emergencyContact, 
    emergencyPhone
) VALUES (
    'Admin',
    'User',
    'admin@company.com',
    '9876543226',
    'Administrator',
    'Administration',
    'System Administrator',
    '2024-01-01',
    100000.00,
    'ACTIVE',
    'Admin Office, Company Building',
    'Emergency Admin Contact',
    '9876543226'
);

-- Insert Manager User
INSERT INTO employees (
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    designation, 
    department, 
    position, 
    hireDate, 
    salary, 
    status, 
    address, 
    emergencyContact, 
    emergencyPhone
) VALUES (
    'Manager',
    'User',
    'manager@company.com',
    '9876543228',
    'Manager',
    'Management',
    'Department Manager',
    '2024-01-01',
    80000.00,
    'ACTIVE',
    'Manager Office, Company Building',
    'Emergency Manager Contact',
    '9876543228'
);

-- Insert Admin and Manager User Accounts
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES 
('admin@company.com', 'admin123', 'admin', (SELECT id FROM employees WHERE email = 'admin@company.com')),
('manager@company.com', 'manager123', 'manager', (SELECT id FROM employees WHERE email = 'manager@company.com'));

-- Verify all employees were inserted
SELECT 'ALL EMPLOYEES AFTER INSERTION:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.phoneNumber, e.department, e.position, e.salary, e.status, u.role
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
ORDER BY e.id;

-- Show login credentials for testing
SELECT 'LOGIN CREDENTIALS FOR TESTING:' as status;
SELECT 
    'Employee Login' as user_type,
    e.email as email,
    'password123' as password,
    e.firstName + ' ' + e.lastName as name,
    e.department,
    e.position
FROM employees e 
JOIN user_accounts u ON e.id = u.employee_id 
WHERE u.role = 'employee'

UNION ALL

SELECT 
    'Admin Login' as user_type,
    e.email as email,
    'admin123' as password,
    e.firstName + ' ' + e.lastName as name,
    e.department,
    e.position
FROM employees e 
JOIN user_accounts u ON e.id = u.employee_id 
WHERE u.role = 'admin'

UNION ALL

SELECT 
    'Manager Login' as user_type,
    e.email as email,
    'manager123' as password,
    e.firstName + ' ' + e.lastName as name,
    e.department,
    e.position
FROM employees e 
JOIN user_accounts u ON e.id = u.employee_id 
WHERE u.role = 'manager'

ORDER BY user_type, email;

-- Comprehensive script to insert new employee data into MySQL database
-- This script will store email, name, phone number and all other details

-- Function to generate employee ID based on email
-- (This simulates the frontend logic)

-- Insert new employee with dynamic data
-- Replace the values below with actual signup data

SET @firstName = 'Alice';
SET @lastName = 'Johnson';
SET @email = 'alice.johnson@company.com';
SET @phoneNumber = '9876543210';
SET @password = 'password123';

-- Auto-generate department based on email hash (simulating frontend logic)
SET @department = CASE 
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 0 THEN 'Engineering'
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 1 THEN 'Marketing'
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 2 THEN 'Finance'
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 3 THEN 'HR'
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 4 THEN 'IT'
    WHEN (ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 7 = 5 THEN 'Sales'
    ELSE 'Operations'
END;

-- Auto-generate position based on department
SET @position = CASE @department
    WHEN 'Engineering' THEN 'Software Developer'
    WHEN 'Marketing' THEN 'Marketing Specialist'
    WHEN 'Finance' THEN 'Financial Analyst'
    WHEN 'HR' THEN 'HR Manager'
    WHEN 'IT' THEN 'IT Support'
    WHEN 'Sales' THEN 'Sales Executive'
    ELSE 'Operations Manager'
END;

-- Auto-generate salary based on email hash (simulating frontend logic)
SET @salary = 50000 + ((ASCII(SUBSTRING(@email, 1, 1)) + ASCII(SUBSTRING(@email, 2, 1))) % 30000);

-- Insert employee record
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
    @firstName,
    @lastName,
    @email,
    @phoneNumber,
    'Employee',
    @department,
    @position,
    CURDATE(),
    @salary,
    'ACTIVE',
    'Address to be updated',
    'Emergency contact to be updated',
    '0000000000'
);

-- Get the employee ID that was just inserted
SET @employeeId = LAST_INSERT_ID();

-- Insert user account
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES (
    @email,
    @password,
    'employee',
    @employeeId
);

-- Verify the insertion
SELECT 
    'SUCCESS: New employee data stored in database' as status,
    e.id as employee_id,
    e.firstName,
    e.lastName,
    e.email,
    e.phoneNumber,
    e.department,
    e.position,
    e.salary,
    u.role
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
WHERE e.id = @employeeId;

-- Show all employees to confirm
SELECT 'All employees in database:' as status;
SELECT id, firstName, lastName, email, phoneNumber, department, position, salary, status 
FROM employees 
ORDER BY id;

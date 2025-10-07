-- Insert a test user for login testing
-- This matches the updated User model schema

USE springapp;

-- Insert a test admin user
INSERT INTO users (
    username, 
    password, 
    role, 
    employee_id, 
    email, 
    phone_number, 
    first_name, 
    last_name, 
    department, 
    status, 
    created_at, 
    created_by
) VALUES (
    'admin@company.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- password: admin123
    'ADMIN',
    1,
    'admin@company.com',
    '1234567890',
    'Admin',
    'User',
    'Administration',
    'ACTIVE',
    CURDATE(),
    'SYSTEM'
);

-- Insert a test employee user
INSERT INTO users (
    username, 
    password, 
    role, 
    employee_id, 
    email, 
    phone_number, 
    first_name, 
    last_name, 
    department, 
    status, 
    created_at, 
    created_by
) VALUES (
    'john.smith@company.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- password: admin123
    'EMPLOYEE',
    1,
    'john.smith@company.com',
    '1234567890',
    'John',
    'Smith',
    'Engineering',
    'ACTIVE',
    CURDATE(),
    'SYSTEM'
);

-- Verify the users were inserted
SELECT 'TEST USERS INSERTED:' as status;
SELECT id, username, email, role, employee_id, first_name, last_name, department, status 
FROM users 
WHERE username IN ('admin@company.com', 'john.smith@company.com');

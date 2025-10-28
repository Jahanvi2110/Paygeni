-- Script to sync existing users to employees table
-- This will create employee records for all existing users who don't already have employee records

INSERT INTO employees (first_name, last_name, email, phone_number, department, designation, position, hire_date, salary, status, address, emergency_contact, emergency_phone)
SELECT 
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    COALESCE(u.department, 'General') as department,
    'Employee' as designation,
    'Staff' as position,
    CURDATE() as hire_date,
    50000.0 as salary,
    'ACTIVE' as status,
    NULL as address,
    NULL as emergency_contact,
    NULL as emergency_phone
FROM users u
WHERE u.role = 'EMPLOYEE' 
AND NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.email = u.email
)
AND u.email IS NOT NULL 
AND u.email != '';

-- Show the results
SELECT 'Users synced to employees' as message, COUNT(*) as count
FROM users u
WHERE u.role = 'EMPLOYEE' 
AND EXISTS (
    SELECT 1 FROM employees e WHERE e.email = u.email
);

-- Clear all data from springapp database
-- This will delete all records from all tables

USE springapp;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear all tables
TRUNCATE TABLE deductions;
TRUNCATE TABLE salary_components;
TRUNCATE TABLE payrolls;
TRUNCATE TABLE attendance;
TRUNCATE TABLE users;
TRUNCATE TABLE employees;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify tables are empty
SELECT 'employees' as table_name, COUNT(*) as record_count FROM employees
UNION ALL
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'payrolls' as table_name, COUNT(*) as record_count FROM payrolls
UNION ALL
SELECT 'attendance' as table_name, COUNT(*) as record_count FROM attendance
UNION ALL
SELECT 'deductions' as table_name, COUNT(*) as record_count FROM deductions
UNION ALL
SELECT 'salary_components' as table_name, COUNT(*) as record_count FROM salary_components;

-- Show success message
SELECT 'All data cleared successfully!' as status;

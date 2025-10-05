-- Update all users with properly hashed password for 'password123'
-- This hash corresponds to 'password123' using BCrypt
UPDATE users SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi' WHERE username = 'admin@company.com';
UPDATE users SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi' WHERE username = 'john@example.com';

-- Show updated users
SELECT username, role, employee_id FROM users;

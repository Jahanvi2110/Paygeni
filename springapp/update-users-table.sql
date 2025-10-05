-- Update users table to match the working reference structure
-- This script adds the missing columns to the existing users table

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN email VARCHAR(255) UNIQUE,
ADD COLUMN full_name VARCHAR(255),
ADD COLUMN first_name VARCHAR(255),
ADD COLUMN last_name VARCHAR(255),
ADD COLUMN phone_number VARCHAR(255);

-- Update existing records with data from employees table
UPDATE users u 
JOIN employees e ON u.employee_id = e.id 
SET 
    u.email = e.email,
    u.full_name = CONCAT(e.first_name, ' ', e.last_name),
    u.first_name = e.first_name,
    u.last_name = e.last_name,
    u.phone_number = e.phone_number;

-- Make the new columns NOT NULL after populating them
ALTER TABLE users 
MODIFY COLUMN email VARCHAR(255) NOT NULL,
MODIFY COLUMN full_name VARCHAR(255) NOT NULL,
MODIFY COLUMN first_name VARCHAR(255) NOT NULL,
MODIFY COLUMN last_name VARCHAR(255) NOT NULL,
MODIFY COLUMN phone_number VARCHAR(255) NOT NULL;

-- Verify the changes
SELECT 'Updated users table structure:' as Status;
DESCRIBE users;

SELECT 'Sample data:' as Status;
SELECT user_id, username, email, full_name, first_name, last_name, phone_number, role FROM users LIMIT 5;

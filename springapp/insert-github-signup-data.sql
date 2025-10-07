-- =====================================================
-- INSERT SIGNUP DATA FROM GITHUB REPOSITORY
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Clear existing users (optional - remove if you want to keep existing data)
-- DELETE FROM users;

-- Step 3: Insert signup data from GitHub repository
-- Based on simple-user-table.sql from your GitHub repo
-- Updated to match current User model (firstName, phoneNumber, email, password, role)

INSERT INTO users (first_name, phone_number, email, password, role) VALUES
('John', '9876543210', 'john.smith@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('Alice', '9876543211', 'alice.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN'),
('Mike', '9876543212', 'mike.davis@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('Emma', '9876543213', 'emma.wilson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('David', '9876543214', 'david.brown@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE');

-- Step 4: Verification
SELECT 'SIGNUP DATA INSERTED FROM GITHUB!' as status;
SELECT 'USERS' as table_name, COUNT(*) as count FROM users;

-- Show the inserted data
SELECT 'SIGNUP USERS FROM GITHUB' as info;
SELECT id, first_name, phone_number, email, role FROM users ORDER BY id;

-- Instructions:
-- 1. Run this script in MySQL Workbench
-- 2. The password is BCrypt encoded for 'password123'
-- 3. Users can login with their email and password 'password123'

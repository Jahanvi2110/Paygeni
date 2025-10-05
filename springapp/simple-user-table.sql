-- =====================================================
-- ULTRA-SIMPLE USER TABLE - ONLY ESSENTIAL LOGIN COLUMNS
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Drop the existing user_accounts table
DROP TABLE IF EXISTS user_accounts;

-- Step 3: Create ULTRA-SIMPLE user_accounts table (only 4 essential columns)
CREATE TABLE user_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'EMPLOYEE'
);

-- Step 4: Insert simple user accounts (only email, password, role)
INSERT INTO user_accounts (email, password, role) VALUES
('john.smith@company.com', 'password123', 'EMPLOYEE'),
('alice.johnson@company.com', 'password123', 'ADMIN'),
('mike.davis@company.com', 'password123', 'EMPLOYEE'),
('emma.wilson@company.com', 'password123', 'EMPLOYEE'),
('david.brown@company.com', 'password123', 'EMPLOYEE');

-- Step 5: Verification
SELECT 'USER TABLE SIMPLIFIED!' as status;
SELECT 'USER_ACCOUNTS' as table_name, COUNT(*) as count FROM user_accounts;

-- Show the simple structure
DESCRIBE user_accounts;

-- Show sample data
SELECT 'SAMPLE USER ACCOUNTS' as info;
SELECT id, email, role FROM user_accounts;

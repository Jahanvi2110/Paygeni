-- =====================================================
-- SIMPLIFY USER_ACCOUNTS TABLE - REMOVE UNNECESSARY COLUMNS
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Check current user_accounts table structure
DESCRIBE user_accounts;

-- Step 3: Create a backup of current data
CREATE TABLE user_accounts_backup AS SELECT * FROM user_accounts;

-- Step 4: Drop the existing user_accounts table
DROP TABLE user_accounts;

-- Step 5: Create SIMPLIFIED user_accounts table with only essential columns
CREATE TABLE user_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'EMPLOYEE'
);

-- Step 6: Insert data from backup (only the essential columns)
INSERT INTO user_accounts (email, password, role)
SELECT 
    username as email,
    password,
    role
FROM user_accounts_backup
WHERE username IS NOT NULL AND password IS NOT NULL;

-- Step 7: Drop the backup table
DROP TABLE user_accounts_backup;

-- Step 8: Verification
SELECT 'USER TABLE SIMPLIFIED!' as status;
SELECT 'USER_ACCOUNTS' as table_name, COUNT(*) as count FROM user_accounts;

-- Show the new simple structure
DESCRIBE user_accounts;

-- Show sample data
SELECT 'SAMPLE USER ACCOUNTS' as info;
SELECT id, email, role FROM user_accounts LIMIT 10;

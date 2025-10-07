USE springapp;

-- Clear all users from the users table
DELETE FROM users;

-- Verification
SELECT 'USERS TABLE CLEARED!' as status;
SELECT 'USERS' as table_name, COUNT(*) as count FROM users;

-- Instructions:
-- 1. Run this script in MySQL Workbench
-- 2. This will remove all existing users
-- 3. Users can now only be created via signup functionality

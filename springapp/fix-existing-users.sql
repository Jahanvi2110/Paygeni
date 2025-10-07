-- Fix existing users by populating username field with email
-- This will make the existing users compatible with the new login system

USE springapp;

-- Update all users to use email as username
UPDATE users 
SET username = email 
WHERE username IS NULL OR username = '';

-- Update employee_id to be the same as id for existing users
UPDATE users 
SET employee_id = id 
WHERE employee_id = 0;

-- Set proper status for all users
UPDATE users 
SET status = 'ACTIVE' 
WHERE status IS NULL OR status = '';

-- Set created_at for users without it
UPDATE users 
SET created_at = CURDATE() 
WHERE created_at IS NULL;

-- Set created_by for users without it
UPDATE users 
SET created_by = 'SYSTEM' 
WHERE created_by IS NULL OR created_by = '';

-- Verify the updates
SELECT 'UPDATED USERS:' as status;
SELECT id, username, email, role, employee_id, status, created_at, created_by 
FROM users 
ORDER BY id;

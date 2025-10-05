-- =====================================================
-- SIMPLE DEDUCTIONS TABLE TEST SCRIPT
-- =====================================================
-- This script will test if we can insert into deductions table
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Check if deductions table exists and its structure
DESCRIBE deductions;

-- Step 3: Check if payrolls table exists (needed for foreign key)
DESCRIBE payrolls;

-- Step 4: Check if employees table exists
DESCRIBE employees;

-- Step 5: Check current data in tables
SELECT 'EMPLOYEES COUNT' as table_name, COUNT(*) as count FROM employees;
SELECT 'PAYROLLS COUNT' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'DEDUCTIONS COUNT' as table_name, COUNT(*) as count FROM deductions;

-- Step 6: Try to insert a simple test record
INSERT INTO deductions (
    amount,
    type,
    payroll_id,
    approved_by,
    created_at,
    deduction_type,
    department
) VALUES (
    1000.00,
    'TEST',
    1,
    'Test User',
    '2024-01-01',
    'TAX',
    'Test Department'
);

-- Step 7: Check if the test record was inserted
SELECT 'TEST INSERT RESULT' as status;
SELECT COUNT(*) as deductions_count FROM deductions;
SELECT * FROM deductions LIMIT 5;

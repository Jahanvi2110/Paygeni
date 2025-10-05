-- =====================================================
-- CORRECT DEDUCTIONS TABLE POPULATION SCRIPT
-- Based on actual database schema from your interface
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Clear existing deductions (optional)
-- DELETE FROM deductions;

-- Step 3: Insert deduction data matching your actual schema
INSERT INTO deductions (
    amount,
    type,
    payroll_id,
    approved_by,
    created_at,
    deduction_type,
    department
) VALUES 
-- Employee 1: John Smith (Payroll ID: 1)
(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-02-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-02-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-02-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-03-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-03-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-03-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-04-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-04-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-04-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-05-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-05-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-05-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-06-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-06-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-06-01', 'OTHER', 'Engineering'),

-- Employee 2: Alice Johnson (Payroll ID: 2)
(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-01-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-01-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-01-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-03-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-03-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-03-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-04-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-04-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-04-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-05-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-05-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-05-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 2, 'HR Manager', '2024-06-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 2, 'HR Manager', '2024-06-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 2, 'HR Manager', '2024-06-01', 'OTHER', 'HR'),

-- Employee 3: Mike Davis (Payroll ID: 3)
(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-01-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-01-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-01-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-02-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-02-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-02-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-03-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-03-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-03-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-04-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-04-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-04-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-05-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-05-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-05-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 3, 'HR Manager', '2024-06-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 3, 'HR Manager', '2024-06-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 3, 'HR Manager', '2024-06-01', 'OTHER', 'Engineering'),

-- Employee 4: Emma Wilson (Payroll ID: 4)
(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-01-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-01-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-01-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-02-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-02-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-02-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-03-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-03-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-03-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-04-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-04-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-04-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-05-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-05-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-05-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 4, 'HR Manager', '2024-06-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 4, 'HR Manager', '2024-06-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 4, 'HR Manager', '2024-06-01', 'OTHER', 'Finance'),

-- Employee 5: David Brown (Payroll ID: 5)
(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-01-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-01-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-01-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-02-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-02-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-02-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-03-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-03-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-03-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-04-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-04-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-04-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-05-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-05-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-05-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 5, 'HR Manager', '2024-06-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 5, 'HR Manager', '2024-06-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 5, 'HR Manager', '2024-06-01', 'OTHER', 'Admin');

-- Step 4: Verification Queries
SELECT 'DEDUCTIONS POPULATION COMPLETE' as Status;
SELECT COUNT(*) as total_deductions FROM deductions;

-- Check deductions by type
SELECT 
    deduction_type,
    COUNT(*) as count,
    SUM(amount) as total_amount
FROM deductions 
GROUP BY deduction_type;

-- Check deductions by department
SELECT 
    department,
    COUNT(*) as count,
    SUM(amount) as total_amount
FROM deductions 
GROUP BY department;

-- Show sample deduction records
SELECT 
    id,
    amount,
    type,
    payroll_id,
    deduction_type,
    department,
    created_at
FROM deductions 
ORDER BY created_at DESC, payroll_id
LIMIT 20;

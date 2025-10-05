-- =====================================================
-- COMPLETE SOLUTION: CREATE PAYROLLS FIRST, THEN DEDUCTIONS
-- =====================================================
-- This script will:
-- 1. Create payroll records for each employee
-- 2. Then create deduction records linked to those payrolls
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Check current state
SELECT 'BEFORE POPULATION' as status;
SELECT 'EMPLOYEES' as table_name, COUNT(*) as count FROM employees;
SELECT 'PAYROLLS' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'DEDUCTIONS' as table_name, COUNT(*) as count FROM deductions;

-- Step 3: Create payroll records for each employee (if they don't exist)
INSERT IGNORE INTO payrolls (
    pay_date,
    basic_salary,
    total_earnings,
    total_deductions,
    net_salary,
    employee_id,
    employee_name,
    department,
    pay_period,
    status,
    payment_method,
    processed_date,
    processed_by,
    notes
) VALUES 
-- Employee 1: John Smith
('2024-01-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-01', 'HR Manager', 'Monthly salary'),
('2024-02-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-01', 'HR Manager', 'Monthly salary'),
('2024-03-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'Mar 2024', 'PAID', 'BANK_TRANSFER', '2024-03-01', 'HR Manager', 'Monthly salary'),
('2024-04-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'Apr 2024', 'PAID', 'BANK_TRANSFER', '2024-04-01', 'HR Manager', 'Monthly salary'),
('2024-05-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'May 2024', 'PAID', 'BANK_TRANSFER', '2024-05-01', 'HR Manager', 'Monthly salary'),
('2024-06-01', 25000.00, 25000.00, 9500.00, 15500.00, 1, 'John Smith', 'Engineering', 'Jun 2024', 'PAID', 'BANK_TRANSFER', '2024-06-01', 'HR Manager', 'Monthly salary'),

-- Employee 2: Alice Johnson
('2024-01-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-01', 'HR Manager', 'Monthly salary'),
('2024-02-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-01', 'HR Manager', 'Monthly salary'),
('2024-03-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'Mar 2024', 'PAID', 'BANK_TRANSFER', '2024-03-01', 'HR Manager', 'Monthly salary'),
('2024-04-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'Apr 2024', 'PAID', 'BANK_TRANSFER', '2024-04-01', 'HR Manager', 'Monthly salary'),
('2024-05-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'May 2024', 'PAID', 'BANK_TRANSFER', '2024-05-01', 'HR Manager', 'Monthly salary'),
('2024-06-01', 30000.00, 30000.00, 11400.00, 18600.00, 2, 'Alice Johnson', 'HR', 'Jun 2024', 'PAID', 'BANK_TRANSFER', '2024-06-01', 'HR Manager', 'Monthly salary'),

-- Employee 3: Mike Davis
('2024-01-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-01', 'HR Manager', 'Monthly salary'),
('2024-02-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-01', 'HR Manager', 'Monthly salary'),
('2024-03-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'Mar 2024', 'PAID', 'BANK_TRANSFER', '2024-03-01', 'HR Manager', 'Monthly salary'),
('2024-04-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'Apr 2024', 'PAID', 'BANK_TRANSFER', '2024-04-01', 'HR Manager', 'Monthly salary'),
('2024-05-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'May 2024', 'PAID', 'BANK_TRANSFER', '2024-05-01', 'HR Manager', 'Monthly salary'),
('2024-06-01', 22000.00, 22000.00, 8360.00, 13640.00, 3, 'Mike Davis', 'Engineering', 'Jun 2024', 'PAID', 'BANK_TRANSFER', '2024-06-01', 'HR Manager', 'Monthly salary'),

-- Employee 4: Emma Wilson
('2024-01-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-01', 'HR Manager', 'Monthly salary'),
('2024-02-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-01', 'HR Manager', 'Monthly salary'),
('2024-03-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'Mar 2024', 'PAID', 'BANK_TRANSFER', '2024-03-01', 'HR Manager', 'Monthly salary'),
('2024-04-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'Apr 2024', 'PAID', 'BANK_TRANSFER', '2024-04-01', 'HR Manager', 'Monthly salary'),
('2024-05-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'May 2024', 'PAID', 'BANK_TRANSFER', '2024-05-01', 'HR Manager', 'Monthly salary'),
('2024-06-01', 28000.00, 28000.00, 10640.00, 17360.00, 4, 'Emma Wilson', 'Finance', 'Jun 2024', 'PAID', 'BANK_TRANSFER', '2024-06-01', 'HR Manager', 'Monthly salary'),

-- Employee 5: David Brown
('2024-01-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'Jan 2024', 'PAID', 'BANK_TRANSFER', '2024-01-01', 'HR Manager', 'Monthly salary'),
('2024-02-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'Feb 2024', 'PAID', 'BANK_TRANSFER', '2024-02-01', 'HR Manager', 'Monthly salary'),
('2024-03-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'Mar 2024', 'PAID', 'BANK_TRANSFER', '2024-03-01', 'HR Manager', 'Monthly salary'),
('2024-04-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'Apr 2024', 'PAID', 'BANK_TRANSFER', '2024-04-01', 'HR Manager', 'Monthly salary'),
('2024-05-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'May 2024', 'PAID', 'BANK_TRANSFER', '2024-05-01', 'HR Manager', 'Monthly salary'),
('2024-06-01', 20000.00, 20000.00, 7600.00, 12400.00, 5, 'David Brown', 'Admin', 'Jun 2024', 'PAID', 'BANK_TRANSFER', '2024-06-01', 'HR Manager', 'Monthly salary');

-- Step 4: Check payrolls were created
SELECT 'AFTER PAYROLL CREATION' as status;
SELECT COUNT(*) as payrolls_count FROM payrolls;

-- Step 5: Get payroll IDs for deductions
SELECT 'PAYROLL IDS' as info;
SELECT id, employee_name, pay_period FROM payrolls ORDER BY employee_id, pay_period;

-- Step 6: Now create deductions linked to payrolls
INSERT INTO deductions (
    amount,
    type,
    payroll_id,
    approved_by,
    created_at,
    deduction_type,
    department
) VALUES 
-- Get payroll IDs dynamically - this is a simplified version
-- We'll use the first payroll ID for each employee
(6000.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 1, 'HR Manager', '2024-01-01', 'OTHER', 'Engineering'),

(6000.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'TAX', 'Engineering'),
(3000.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'PF', 'Engineering'),
(500.00, 'MONTHLY', 2, 'HR Manager', '2024-02-01', 'OTHER', 'Engineering'),

(7200.00, 'MONTHLY', 7, 'HR Manager', '2024-01-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 7, 'HR Manager', '2024-01-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 7, 'HR Manager', '2024-01-01', 'OTHER', 'HR'),

(7200.00, 'MONTHLY', 8, 'HR Manager', '2024-02-01', 'TAX', 'HR'),
(3600.00, 'MONTHLY', 8, 'HR Manager', '2024-02-01', 'PF', 'HR'),
(600.00, 'MONTHLY', 8, 'HR Manager', '2024-02-01', 'OTHER', 'HR'),

(5280.00, 'MONTHLY', 13, 'HR Manager', '2024-01-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 13, 'HR Manager', '2024-01-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 13, 'HR Manager', '2024-01-01', 'OTHER', 'Engineering'),

(5280.00, 'MONTHLY', 14, 'HR Manager', '2024-02-01', 'TAX', 'Engineering'),
(2640.00, 'MONTHLY', 14, 'HR Manager', '2024-02-01', 'PF', 'Engineering'),
(440.00, 'MONTHLY', 14, 'HR Manager', '2024-02-01', 'OTHER', 'Engineering'),

(6720.00, 'MONTHLY', 19, 'HR Manager', '2024-01-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 19, 'HR Manager', '2024-01-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 19, 'HR Manager', '2024-01-01', 'OTHER', 'Finance'),

(6720.00, 'MONTHLY', 20, 'HR Manager', '2024-02-01', 'TAX', 'Finance'),
(3360.00, 'MONTHLY', 20, 'HR Manager', '2024-02-01', 'PF', 'Finance'),
(560.00, 'MONTHLY', 20, 'HR Manager', '2024-02-01', 'OTHER', 'Finance'),

(4800.00, 'MONTHLY', 25, 'HR Manager', '2024-01-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 25, 'HR Manager', '2024-01-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 25, 'HR Manager', '2024-01-01', 'OTHER', 'Admin'),

(4800.00, 'MONTHLY', 26, 'HR Manager', '2024-02-01', 'TAX', 'Admin'),
(2400.00, 'MONTHLY', 26, 'HR Manager', '2024-02-01', 'PF', 'Admin'),
(400.00, 'MONTHLY', 26, 'HR Manager', '2024-02-01', 'OTHER', 'Admin');

-- Step 7: Final verification
SELECT 'FINAL RESULTS' as status;
SELECT 'EMPLOYEES' as table_name, COUNT(*) as count FROM employees;
SELECT 'PAYROLLS' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'DEDUCTIONS' as table_name, COUNT(*) as count FROM deductions;

-- Show sample deductions
SELECT 
    d.id,
    d.amount,
    d.deduction_type,
    d.department,
    p.employee_name,
    p.pay_period
FROM deductions d
JOIN payrolls p ON d.payroll_id = p.id
ORDER BY d.id
LIMIT 10;

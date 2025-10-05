-- =====================================================
-- COMPLETE DEDUCTIONS TABLE POPULATION SCRIPT
-- =====================================================
-- This script populates the deductions table with comprehensive
-- deduction data for all employees in the system
-- =====================================================

-- Step 1: Clear existing deductions (optional)
-- DELETE FROM deductions;

-- Step 2: Insert comprehensive deduction data for all employees
-- Each employee gets realistic deductions based on their salary

INSERT INTO deductions (
    payroll_id, 
    tax, 
    pf, 
    other, 
    total_deduction,
    deduction_date,
    description
) VALUES 
-- Employee 1: John Smith (Salary: ₹25,000)
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-01-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-02-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-03-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-04-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-05-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-06-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-07-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-08-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-09-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-10-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-11-01', 'Monthly Tax, PF, and Other Deductions'),
(1, 2500.00, 3000.00, 500.00, 6000.00, '2024-12-01', 'Monthly Tax, PF, and Other Deductions'),

-- Employee 2: Alice Johnson (Salary: ₹30,000)
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-01-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-02-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-03-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-04-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-05-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-06-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-07-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-08-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-09-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-10-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-11-01', 'Monthly Tax, PF, and Other Deductions'),
(2, 3000.00, 3600.00, 600.00, 7200.00, '2024-12-01', 'Monthly Tax, PF, and Other Deductions'),

-- Employee 3: Mike Davis (Salary: ₹22,000)
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-01-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-02-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-03-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-04-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-05-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-06-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-07-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-08-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-09-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-10-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-11-01', 'Monthly Tax, PF, and Other Deductions'),
(3, 2200.00, 2640.00, 440.00, 5280.00, '2024-12-01', 'Monthly Tax, PF, and Other Deductions'),

-- Employee 4: Emma Wilson (Salary: ₹28,000)
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-01-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-02-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-03-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-04-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-05-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-06-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-07-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-08-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-09-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-10-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-11-01', 'Monthly Tax, PF, and Other Deductions'),
(4, 2800.00, 3360.00, 560.00, 6720.00, '2024-12-01', 'Monthly Tax, PF, and Other Deductions'),

-- Employee 5: David Brown (Salary: ₹20,000)
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-01-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-02-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-03-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-04-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-05-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-06-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-07-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-08-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-09-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-10-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-11-01', 'Monthly Tax, PF, and Other Deductions'),
(5, 2000.00, 2400.00, 400.00, 4800.00, '2024-12-01', 'Monthly Tax, PF, and Other Deductions');

-- Step 3: Verification Queries
-- Check total deductions count
SELECT 'DEDUCTIONS POPULATION COMPLETE' as Status;
SELECT COUNT(*) as total_deductions FROM deductions;

-- Check deductions by employee
SELECT 
    'DEDUCTIONS BY EMPLOYEE' as Report,
    e.first_name,
    e.last_name,
    e.salary,
    COUNT(d.id) as deduction_records,
    SUM(d.total_deduction) as total_deductions_year,
    AVG(d.total_deduction) as avg_monthly_deduction
FROM employees e
LEFT JOIN deductions d ON e.id = d.payroll_id
GROUP BY e.id, e.first_name, e.last_name, e.salary
ORDER BY e.salary DESC;

-- Check deduction breakdown
SELECT 
    'DEDUCTION BREAKDOWN' as Report,
    SUM(tax) as total_tax,
    SUM(pf) as total_pf,
    SUM(other) as total_other,
    SUM(total_deduction) as grand_total
FROM deductions;

-- Show sample deduction records
SELECT 
    'SAMPLE DEDUCTION RECORDS' as Report,
    d.id,
    CONCAT(e.first_name, ' ', e.last_name) as employee_name,
    d.tax,
    d.pf,
    d.other,
    d.total_deduction,
    d.deduction_date
FROM deductions d
JOIN employees e ON d.payroll_id = e.id
ORDER BY d.deduction_date DESC, e.salary DESC
LIMIT 10;

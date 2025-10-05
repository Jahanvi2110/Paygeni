-- ===================================================================
-- POPULATE DEDUCTIONS TABLE WITH COMPREHENSIVE DATA
-- ===================================================================
-- This script fills the deductions table with realistic deduction data
-- for all employees covering multiple months/years

USE springapp;

-- Clear existing deductions to avoid duplicates
DELETE FROM deductions;

-- ===================================================================
-- DECEMBER 2024 DEDUCTIONS (Current Month)
-- ===================================================================

-- John Smith (Engineering - Senior Developer, Salary: 25,000)
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Dec 2024', 2024, 2500.00, 750.00, 500.00, 3750.00, 'TAX', 'APPROVED', 'December 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', 1, 1),

-- Alice Johnson (HR - Manager, Salary: 30,000)
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Dec 2024', 2024, 3000.00, 900.00, 600.00, 4500.00, 'TAX', 'APPROVED', 'December 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', 2, 2),

-- Mike Davis (Engineering - Developer, Salary: 22,000)
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Dec 2024', 2024, 2200.00, 660.00, 440.00, 3300.00, 'TAX', 'APPROVED', 'December 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', 3, 3),

-- Emma Wilson (Finance - Analyst, Salary: 28,000)
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Dec 2024', 2024, 2800.00, 840.00, 560.00, 4200.00, 'TAX', 'APPROVED', 'December 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', 4, 4),

-- David Brown (Admin - Assistant, Salary: 20,000)
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP005', 'David Brown', 'david_brown.jpg', 'Admin', 'Dec 2024', 2024, 2000.00, 600.00, 400.00, 3000.00, 'TAX', 'APPROVED', 'December 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', 5, 5),

-- ===================================================================
-- NOVEMBER 2024 DEDUCTIONS
-- ===================================================================

INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Nov 2024', 2024, 2500.00, 750.00, 500.00, 3750.00, 'TAX', 'APPROVED', 'November 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 1),
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Nov 2024', 2024, 3000.00, 900.00, 600.00, 4500.00, 'TAX', 'APPROVED', 'November 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 2),
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Nov 2024', 2024, 2200.00, 660.00, 440.00, 3300.00, 'TAX', 'APPROVED', 'November 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 3),
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Nov 2024', 2024, 2800.00, 840.00, 560.00, 4200.00, 'TAX', 'APPROVED', 'November 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 4),
('EMP005', 'David Brown', 'david_brown.jpg', 'Admin', 'Nov 2024', 2024, 2000.00, 600.00, 400.00, 3000.00, 'TAX', 'APPROVED', 'November 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 5),

-- ===================================================================
-- OCTOBER 2024 DEDUCTIONS
-- ===================================================================

INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Oct 2024', 2024, 2500.00, 750.00, 500.00, 3750.00, 'TAX', 'APPROVED', 'October 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 1),
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Oct 2024', 2024, 3000.00, 900.00, 600.00, 4500.00, 'TAX', 'APPROVED', 'October 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 2),
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Oct 2024', 2024, 2200.00, 660.00, 440.00, 3300.00, 'TAX', 'APPROVED', 'October 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 3),
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Oct 2024', 2024, 2800.00, 840.00, 560.00, 4200.00, 'TAX', 'APPROVED', 'October 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 4),
('EMP005', 'David Brown', 'david_brown.jpg', 'Admin', 'Oct 2024', 2024, 2000.00, 600.00, 400.00, 3000.00, 'TAX', 'APPROVED', 'October 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 5),

-- ===================================================================
-- SEPTEMBER 2024 DEDUCTIONS
-- ===================================================================

INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Sep 2024', 2024, 2500.00, 750.00, 500.00, 3750.00, 'TAX', 'APPROVED', 'September 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 1),
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Sep 2024', 2024, 3000.00, 900.00, 600.00, 4500.00, 'TAX', 'APPROVED', 'September 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 2),
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Sep 2024', 2024, 2200.00, 660.00, 440.00, 3300.00, 'TAX', 'APPROVED', 'September 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 3),
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Sep 2024', 2024, 2800.00, 840.00, 560.00, 4200.00, 'TAX', 'APPROVED', 'September 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 4),
('EMP005', 'David Brown', 'david_brown.jpg', 'Admin', 'Sep 2024', 2024, 2000.00, 600.00, 400.00, 3000.00, 'TAX', 'APPROVED', 'September 2024 Tax Deductions', 'HR Admin', 'Regular monthly deductions', NULL, 5),

-- ===================================================================
-- SPECIAL DEDUCTIONS (BONUS, INSURANCE, ETC.)
-- ===================================================================

-- Additional Insurance deductions for December
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Dec 2024', 2024, 0.00, 0.00, 800.00, 800.00, 'INSURANCE', 'APPROVED', 'Health Insurance Premium', 'HR Admin', 'Annual health insurance', NULL, 1),
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Dec 2024', 2024, 0.00, 0.00, 1000.00, 1000.00, 'INSURANCE', 'APPROVED', 'Health Insurance Premium', 'HR Admin', 'Annual health insurance', NULL, 2),
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Dec 2024', 2024, 0.00, 0.00, 750.00, 750.00, 'INSURANCE', 'APPROVED', 'Health Insurance Premium', 'HR Admin', 'Annual health insurance', NULL, 3),
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Dec 2024', 2024, 0.00, 0.00, 900.00, 900.00, 'INSURANCE', 'APPROVED', 'Health Insurance Premium', 'HR Admin', 'Annual health insurance', NULL, 4),
('EMP005', 'David Brown', 'david_brown.jpg', 'Admin', 'Dec 2024', 2024, 0.00, 0.00, 650.00, 650.00, 'INSURANCE', 'APPROVED', 'Health Insurance Premium', 'HR Admin', 'Annual health insurance', NULL, 5),

-- PF Contributions for Professional Development
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP001', 'John Smith', 'john_smith.jpg', 'Engineering', 'Dec 2024', 2024, 0.00, 500.00, 0.00, 500.00, 'PF', 'APPROVED', 'Professional Development Fund', 'HR Admin', 'Training and certification fund', NULL, 1),
('EMP002', 'Alice Johnson', 'alice_johnson.jpg', 'HR', 'Dec 2024', 2024, 0.00, 600.00, 0.00, 600.00, 'PF', 'APPROVED', 'Professional Development Fund', 'HR Admin', 'Training and certification fund', NULL, 2),

-- Other miscellaneous deductions
INSERT INTO deductions (employee_id, employee_name, employee_photo, department, month, year, tax, pf, other, total_deduction, deduction_type, status, description, approved_by, notes, payroll_ref_id, employee_ref_id) VALUES 
('EMP003', 'Mike Davis', 'mike_davis.jpg', 'Engineering', 'Dec 2024', 2024, 0.00, 0.00, 300.00, 300.00, 'OTHER', 'PENDING', 'Unpaid Leave Deduction', 'HR Admin', 'Partial deduction for sick leave', NULL, 3),
('EMP004', 'Emma Wilson', 'emma_wilson.jpg', 'Finance', 'Dec 2024', 2024, 0.00, 0.00, 200.00, 200.00, 'OTHER', 'APPROVED', 'Equipment Return Fee', 'HR Admin', 'Late return fee for laptop', NULL, 4);

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================

-- Show total deductions by employee
SELECT 
    '=== TOTAL DEDUCTIONS BY EMPLOYEE ===' as Status;

SELECT 
    employee_name,
    department,
    COUNT(*) as total_deduction_records,
    SUM(total_deduction) as total_deduction_amount,
    SUM(tax) as total_tax,
    SUM(pf) as total_pf,
    SUM(other) as total_other
FROM deductions 
GROUP BY employee_name, department
ORDER BY employee_name;

-- Show monthly deduction summary
SELECT 
    '=== MONTHLY DEDUCTION SUMMARY ===' as Status;

SELECT 
    month,
    COUNT(*) as records_count,
    SUM(total_deduction) as total_amount,
    AVG(total_deduction) as avg_amount
FROM deductions 
GROUP BY month
ORDER BY month DESC;

-- Show deduction types breakdown
SELECT 
    '=== DEDUCTION TYPES BREAKDOWN ===' as Status;

SELECT 
    deduction_type,
    COUNT(*) as count,
    SUM(total_deduction) as total_amount
FROM deductions 
GROUP BY deduction_type
ORDER BY total_amount DESC;

COMMIT;

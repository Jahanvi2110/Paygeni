-- Create leave_requests table
CREATE TABLE IF NOT EXISTS leave_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(255) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    approved_by VARCHAR(255),
    created_at DATE DEFAULT (CURRENT_DATE),
    updated_at DATE DEFAULT (CURRENT_DATE),
    notes TEXT,
    employee_ref_id BIGINT,
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id)
);

-- Create advance_requests table
CREATE TABLE IF NOT EXISTS advance_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(255) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    approved_by VARCHAR(255),
    created_at DATE DEFAULT (CURRENT_DATE),
    updated_at DATE DEFAULT (CURRENT_DATE),
    notes TEXT,
    repayment_plan VARCHAR(20),
    employee_ref_id BIGINT,
    FOREIGN KEY (employee_ref_id) REFERENCES employees(id)
);

-- Insert sample leave requests
INSERT INTO leave_requests (employee_id, employee_name, leave_type, start_date, end_date, total_days, reason, status, employee_ref_id) VALUES
('EMP001', 'John Smith', 'ANNUAL', '2024-12-25', '2024-12-29', 5, 'Christmas vacation with family', 'PENDING', 1),
('EMP002', 'Sarah Johnson', 'SICK', '2024-12-20', '2024-12-21', 2, 'Medical appointment and recovery', 'APPROVED', 2),
('EMP003', 'Michael Brown', 'PERSONAL', '2024-12-30', '2024-12-31', 2, 'Personal work', 'PENDING', 3);

-- Insert sample advance requests
INSERT INTO advance_requests (employee_id, employee_name, amount, reason, status, repayment_plan, employee_ref_id) VALUES
('EMP001', 'John Smith', 15000.00, 'Medical emergency for family member', 'PENDING', 'MONTHLY', 1),
('EMP002', 'Sarah Johnson', 25000.00, 'Home renovation expenses', 'APPROVED', 'QUARTERLY', 2),
('EMP003', 'Michael Brown', 10000.00, 'Educational expenses for children', 'PENDING', 'MONTHLY', 3);

-- Verify the data
SELECT 'Leave Requests:' as table_name;
SELECT * FROM leave_requests;

SELECT 'Advance Requests:' as table_name;
SELECT * FROM advance_requests;

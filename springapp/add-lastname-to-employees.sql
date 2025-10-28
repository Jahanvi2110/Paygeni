-- Add lastName column to employees table
ALTER TABLE employees ADD COLUMN last_name VARCHAR(255);

-- Update existing employees to have empty lastName (they can be updated later)
UPDATE employees SET last_name = '' WHERE last_name IS NULL;

-- Make the column nullable for existing records
ALTER TABLE employees MODIFY COLUMN last_name VARCHAR(255) NULL;

-- Optional: Update existing employees with placeholder last names
-- UPDATE employees SET last_name = 'Employee' WHERE last_name IS NULL OR last_name = '';

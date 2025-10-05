# 🧪 **Employee Dashboard Button Testing Guide**

## **Prerequisites**
1. **Spring Boot Backend**: Running on `http://localhost:9090`
2. **Angular Frontend**: Running on `http://localhost:4200`
3. **MySQL Database**: Running with `springapp` database
4. **User Authentication**: Must be logged in as an employee

## **Test Steps**

### **1. Login & Access Dashboard**
- Navigate to `http://localhost:4200`
- Login with employee credentials
- Should redirect to `/employee-dashboard`
- Verify dashboard loads with 4 main cards

### **2. Test Request Leave Button**
- Click **"Request Leave"** button on Leaves card
- Fill out the form:
  - Leave Type: Select any type
  - Start Date: Choose a future date
  - End Date: Choose end date
  - Reason: Enter reason
- Click **"Submit Request"**
- **Expected Result**: 
  - Success alert with Request ID
  - Modal closes
  - Dashboard refreshes
  - Data saved to `leave_requests` table

### **3. Test Request Advance Button**
- Click **"Request Advance"** button on Loans card
- Fill out the form:
  - Amount: Enter amount (e.g., 10000)
  - Reason: Enter reason
  - Repayment Plan: Select plan
- Click **"Submit Request"**
- **Expected Result**:
  - Success alert with Request ID and Amount
  - Modal closes
  - Dashboard refreshes
  - Data saved to `advance_requests` table

### **4. Test Quick Action Buttons**

#### **A. View Payroll Button**
- Click **"View Payroll"** quick action button
- **Expected Result**:
  - Modal opens with complete payroll details
  - Shows Employee Name, ID, Payroll ID
  - Shows salary breakdown (earnings & deductions)
  - Shows net salary after all deductions

#### **B. Download Payslip Button**
- Click **"Download Payslip"** quick action button
- **Expected Result**:
  - File downloads as `.txt` file
  - Contains complete payroll information
  - Filename includes employee name and month

#### **C. Generate Payroll Button**
- Click **"Generate Payroll"** quick action button
- **Expected Result**:
  - Success alert with Payroll ID and Net Salary
  - Dashboard refreshes with new payroll data
  - Data saved to `payrolls` table

### **5. Test Punch In/Out**
- Click **"Punch In"** button
- **Expected Result**: Alert shows punch in time
- Click **"Punch Out"** button
- **Expected Result**: Alert shows punch out time

## **Database Verification**

### **Check Leave Requests**
```sql
SELECT * FROM leave_requests ORDER BY applied_date DESC;
```

### **Check Advance Requests**
```sql
SELECT * FROM advance_requests ORDER BY requested_date DESC;
```

### **Check Payrolls**
```sql
SELECT * FROM payrolls ORDER BY processed_date DESC;
```

## **Expected Behavior**

### **✅ Success Indicators**
- All buttons respond immediately
- Success alerts show with relevant data
- Modals open/close properly
- Dashboard data refreshes automatically
- Database records are created
- No console errors

### **❌ Error Indicators**
- Buttons don't respond
- Error alerts appear
- Console shows HTTP errors
- Database records not created
- Modals don't open/close

## **Troubleshooting**

### **Common Issues**
1. **"User not logged in"**: Ensure user is authenticated
2. **"Failed to submit"**: Check backend is running
3. **"Network error"**: Check CORS configuration
4. **"Database error"**: Check MySQL connection

### **Debug Steps**
1. Check browser console for errors
2. Check Spring Boot console for errors
3. Verify database connection
4. Check API endpoints are accessible

## **API Endpoints Used**

- `POST /api/leave/request` - Create leave request
- `POST /api/advance/request` - Create advance request
- `POST /api/payroll/employee/{id}/create` - Generate payroll
- `GET /api/payroll/employee/{id}/current` - Get current payroll

## **Test Results**

| Button | Status | Notes |
|--------|--------|-------|
| Request Leave | ✅ | Saves to database |
| Request Advance | ✅ | Saves to database |
| View Payroll | ✅ | Shows modal with details |
| Download Payslip | ✅ | Downloads file |
| Generate Payroll | ✅ | Creates payroll record |
| Punch In/Out | ✅ | Updates work hours |

---

**All buttons should work correctly and save data to the database!** 🎉

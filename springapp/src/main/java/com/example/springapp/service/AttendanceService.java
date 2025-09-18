package com.example.springapp.service;

import com.example.springapp.model.Attendance;
import com.example.springapp.model.Employee;
import com.example.springapp.repository.AttendanceRepository;
import com.example.springapp.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository employeeRepo;

    public AttendanceService(AttendanceRepository attendanceRepo, EmployeeRepository employeeRepo) {
        this.attendanceRepo = attendanceRepo;
        this.employeeRepo = employeeRepo;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepo.findAll();
    }

    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepo.findById(id);
    }

    public Attendance createAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public Attendance updateAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    // ✅ Link attendance to employee
    public Attendance linkAttendanceToEmployee(Long attendanceId, Long empId) {
        Attendance attendance = attendanceRepo.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        Employee employee = employeeRepo.findById(empId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        attendance.setEmployee(employee);
        return attendanceRepo.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepo.deleteById(id);
    }
}

package com.example.springapp.controller;

import com.example.springapp.model.Attendance;
import com.example.springapp.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance") // REST best practice → lowercase & plural
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return service.getAllAttendance();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        return service.getAttendanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public Attendance createAttendance(@RequestBody Attendance attendance) {
        return service.createAttendance(attendance);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id,@RequestBody Attendance attendance) {
        attendance.setId(id); // ensure ID consistency
        return ResponseEntity.ok(service.updateAttendance(attendance));
    }
    @PutMapping("/{attendanceId}/link-employees/{empId}")
public ResponseEntity<Attendance> linkAttendanceToEmployee(
        @PathVariable Long attendanceId,
        @PathVariable Long empId) {
    return ResponseEntity.ok(service.linkAttendanceToEmployee(attendanceId, empId));
}


    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        service.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
    
}

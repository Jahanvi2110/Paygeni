package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}

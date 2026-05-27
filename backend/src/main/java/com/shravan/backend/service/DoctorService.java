package com.shravan.backend.service;

import com.shravan.backend.entity.Doctor;

import java.util.List;

public interface DoctorService {

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);

    Doctor createDoctor(Doctor doctor);

    Doctor updateDoctor(Long id, Doctor doctor);

    void deleteDoctor(Long id);
}
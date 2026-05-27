package com.shravan.backend.service.impl;

import com.shravan.backend.entity.Doctor;
import com.shravan.backend.repository.DoctorRepository;
import com.shravan.backend.service.DoctorService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl
        implements DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(
            DoctorRepository doctorRepository) {

        this.doctorRepository = doctorRepository;
    }

    @Override
    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor Not Found"));
    }

    @Override
    public Doctor createDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor updateDoctor(
            Long id,
            Doctor doctor) {

        Doctor currentDoctor =
                doctorRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Doctor Not Found"));

        currentDoctor.setDrName(
                doctor.getDrName());

        currentDoctor.setSpecialization(
                doctor.getSpecialization());

        currentDoctor.setEmail(
                doctor.getEmail());

        return doctorRepository.save(currentDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {

        Doctor doctor =
                doctorRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Doctor Not Found"));

        doctorRepository.delete(doctor);
    }
}
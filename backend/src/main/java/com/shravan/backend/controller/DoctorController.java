package com.shravan.backend.controller;

import com.shravan.backend.entity.Doctor;
import com.shravan.backend.service.DoctorService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(
            DoctorService doctorService) {

        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {

        List<Doctor> doctors =
                doctorService.getAllDoctors();

        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(
            @PathVariable Long id) {

        Doctor doctor =
                doctorService.getDoctorById(id);

        return ResponseEntity.ok(doctor);
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(
            @Valid
            @RequestBody Doctor doctor) {

        Doctor savedDoctor =
                doctorService.createDoctor(doctor);

        return new ResponseEntity<>(
                savedDoctor,
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @Valid
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        Doctor updatedDoctor =
                doctorService.updateDoctor(id, doctor);

        return ResponseEntity.ok(updatedDoctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.noContent().build();
    }
}